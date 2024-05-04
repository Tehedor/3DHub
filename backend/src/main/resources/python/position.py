import sys
from geopy.geocoders import Nominatim

def obtener_coordenadas_direccion(direccion):
    geolocalizador = Nominatim(user_agent="mi_aplicacion")
    ubicacion = geolocalizador.geocode(direccion)
    if ubicacion:
        return ubicacion.latitude, ubicacion.longitude
    else:
        return None, None

direccion = sys.argv[1]
latitud, longitud = obtener_coordenadas_direccion(direccion)
if latitud is not None and longitud is not None:
    print(f"{latitud},{longitud}")