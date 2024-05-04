from flask import Flask, request, jsonify
import os
import json

app = Flask(__name__)

ALLOWED_EXTENSIONS = {'obj', '3mf', 'stl'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/process', methods=['POST'])
def process_file():
    if request.method == 'POST':

        # Parse the JSON data from the form
        data = json.loads(request.form.get('data'))

        # Get the file from the form
        file = request.files['file']

        # Check if the file and the data are provided
        if not file or not data:
            return jsonify({'error': 'File or data not provided'}), 400


        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Get the price of the filament and the filament width from the request body
        # price_filamen = request.json.get('price_filamen', 0.02)
        # filament_width = request.json.get('filament_width', 0.15)

        # Get the price of the filament and the filament width from the request body
        price_filamen = float(data.get('price_filamen', 0.02))
        filament_width = float(data.get('filament_width', 0.15))



        if file and allowed_file(file.filename):
            # Extract the file extension
            file_extension = file.filename.rsplit('.', 1)[1].lower()

            # Save the file to a temporary location with its original extension
            # number = random.randint(1, 1000000)
            nombre = f'text.{file_extension}'
            with open(nombre, 'wb') as f:
                f.write(file.read())

            # Process the file and get the number
            result = process_file_content(nombre, price_filamen, filament_width)

            # Remove the temporary file
            os.remove(nombre)

            # Return the result as JSON
            return jsonify({'result': result})

        else:
            return jsonify({'error': 'File type not allowed'}), 400

def process_file_content(file, price_filamen, filament_width):
    # Define the price of the filament and the filament width
    # You may want to adjust these values or pass them as parameters
    price_filamen = price_filamen
    filament_width = filament_width

    # Define the paths to the configuration files
    print_settings = "configuraciones/config_files/otros/PLA_BASIC.ini"
    printer_type = "configuraciones/config_files/otros/Prusa_i3_MK3S.ini"

    # Select the filament type based on the filament width
    if filament_width <= 0.1:
        filament_type = "configuraciones/config_files/anchura/print_0.10mm.ini"
    elif filament_width <= 0.15:
        filament_type = "configuraciones/config_files/anchura/print_0.15mm.ini"
    else:
        filament_type = "configuraciones/config_files/anchura/print_0.20mm.ini"

    # Define the command to run Prusa Slicer
    command_raw = "prusa-slicer --export-gcode {} --load {} --load {} --load {} --output configuraciones/export-gcodes/{}.gcode"
    command = command_raw.format(file, print_settings, filament_type, printer_type, file)

    # Run the command
    os.system(command)


    gcode_file = "configuraciones/export-gcodes/{}.gcode".format(file)
    # Read the output file
    with open(gcode_file, "r") as f:
        data = []
        for num, line in enumerate(f, 1):
            if "filament used" in line:
                lineNumber = num
                data.append(line)
                break
        
        data.extend(f.readlines()[0:8])

        # Extract the filament used
        filament_used = data[1][2:].replace("\n", "").split(" = ")[1]

    # Calculate the price
    price = float(filament_used) * price_filamen

    # Remove the temporary file
    os.remove(gcode_file)
    
    # Return the result
    return {"price": price}    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


# curl -X POST -H "Content-Type: multipart/form-data" -F "file=@/path/to/your/file" -F "price_filamen=0.02" -F "filament_width=0.15" http://0.0.0.0:5000/process


# curl -X POST -H "Content-Type: application/json" -d '{"file": "@/path/to/your/file", "price_filamen": 0.02, "filament_width": 0.15}' http://0.0.0.0:5000/process
# curl -X POST -H "Content-Type: application/json" -d '{"file": "@frog_Head.stl", "price_filamen": 0.02, "filament_width": 0.15}' http://0.0.0.0:5000/process
# curl -X POST -H "Content-Type: application/json" -d '{"file": "@/home/sergio/Desktop/waste/GcodeAnalyzer/GcodeAnalyzer/frog_Head.stl", "price_filamen": 0.02, "filament_width": 0.15}' http://0.0.0.0:5000/process

# curl -X POST -H "Content-Type: multipart/form-data" -F "file=@/home/sergio/Desktop/waste/GcodeAnalyzer/GcodeAnalyzer/frog_Head.stl" -F "price_filamen=0.02" -F "filament_width=0.15" http://0.0.0.0:5000/process

# curl -X POST -H "Content-Type: multipart/form-data" -F "file=@/home/sergio/Desktop/microservicio/waste/frog_Head.stl" -F "data={"price_filamen": 0.02, "filament_width": 0.15}" http://0.0.0.0:5000/process
# curl -X POST -H "Content-Type: multipart/form-data" -F "file=@/home/sergio/Desktop/microservicio/waste/frog_Head.stl" -F 'data={"price_filamen": 0.02, "filament_width": 0.15}' http://0.0.0.0:5000/process
# curl -X POST -H "Content-Type: multipart/form-data" -F "file=@/home/sergio/Desktop/microservicio/waste/frog_Head.stl" -F "data={\"price_filamen\": 0.02, \"filament_width\": 0.15}" http://0.0.0.0:5000/process