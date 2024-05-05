package com.dhub.backend;

import java.sql.Date;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.dhub.backend.models.ERole;
import com.dhub.backend.models.EStatus;
import com.dhub.backend.models.Order;
import com.dhub.backend.models.Printer;
import com.dhub.backend.models.Ratings;
import com.dhub.backend.models.Role;
import com.dhub.backend.models.UserEntity;
import com.dhub.backend.models.EColor;
import com.dhub.backend.models.EMaterial;
import com.dhub.backend.models.EPrinterType;
import com.dhub.backend.repository.OrderRepository;
import com.dhub.backend.repository.RatingsRepository;
import com.dhub.backend.repository.UserRepository;
import com.google.cloud.spring.autoconfigure.storage.GcpStorageAutoConfiguration;
import com.google.cloud.storage.Acl.User;
import com.dhub.backend.repository.PrinterRepository;


@SpringBootApplication(exclude = {GcpStorageAutoConfiguration.class})
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	RatingsRepository ratingsRepository;

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	PrinterRepository printerRepository;

	@Bean
	CommandLineRunner init(){
		return args -> {


/**
 * Creación de usuarios
 */


			UserEntity designer = UserEntity.builder()
				.dni("222222222A")
				.email("diseñador@gmail.com")
				.username("diseñador")
				.password(passwordEncoder.encode("diseñador"))
				.roles(Set.of(Role.builder().name(ERole.ROLE_DESIGNER).build()))
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.factAddress("Calle de la Princesa, 1, 28008 Madrid, España")
				.build();
			UserEntity manufacturer = UserEntity.builder()
				.dni("333333333A")
				.email("fabricante@gmail.com")
				.username("fabricante")
				.password(passwordEncoder.encode("fabricante"))
				.roles(Set.of(Role.builder().name(ERole.ROLE_MANUFACTURER).build()))
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.factAddress("Calle de la Princesa, 1, 28008 Madrid, España")
				.iban("ES7921000813610123456782")
				.build();
			UserEntity manufacturer2 = UserEntity.builder()
				.dni("444444444A")
				.email("fabricante2@gmail.com")
				.username("fabricante2")
				.password(passwordEncoder.encode("fabricante2"))
				.roles(Set.of(Role.builder().name(ERole.ROLE_MANUFACTURER).build()))
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.factAddress("Calle de la Princesa, 1, 28008 Madrid, España")
				.iban("ES7921000813610123456789")
				.build();

/**
 * Creación de impresoras
*/

			Printer printer = Printer.builder()
				.modelName("Anycubic 1")
				.printerLocation("Avenida Complutense, 30, 28040 Madrid, España")
				.printerType(EPrinterType.FDM)
				.urlPhoto("https://storage.googleapis.com/3dhub_isst/printers/Anycubic%20Impresora%203D.jpg")
				.servicePrice(0.5)
				.maxUnities(1)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.1)
				.color(EColor.BLACK)
				.material(EMaterial.PLASTIC)
				.userEntity(manufacturer)
				.build();
			Printer printer2 = Printer.builder()
				.modelName("Anycubic Kobra 2")
				.printerLocation("Calle Rosal, 45, 33009 Oviedo, Asturias")
				.printerType(EPrinterType.SLA)
				.urlPhoto("https://storage.googleapis.com/3dhub_isst/printers/Anycubic%20Kobra2%20Plus.jpg")
				.servicePrice(0.5)
				.maxUnities(1)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.1)
				.color(EColor.GREEN)
				.material(EMaterial.RESIN)
				.userEntity(manufacturer)
				.build();
				
			Printer printer3 = Printer.builder()
				.modelName("Creality Ender 3")
				.printerLocation("Calle Dr. Jose Maria Sarget, 18, 03300 Orihuela, Alicante")
				.printerType(EPrinterType.MSLA)
				.urlPhoto("https://storage.googleapis.com/3dhub_isst/printers/Creality%20Ender.jpg")
				.servicePrice(0.45)
				.maxUnities(5)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.15)
				.color(EColor.BLUE)
				.material(EMaterial.PLASTIC)
				.userEntity(manufacturer)
				.build();
			Printer printer4 = Printer.builder()
				.modelName("Eleego Mars 4 Max")
				.printerLocation("Calle Marqués de Larios, 6, Distrito Centro, 29005 Málaga")
				.printerType(EPrinterType.DLP)
				.urlPhoto("https://storage.googleapis.com/3dhub_isst/printers/Elegoo%20Mars4%20Max.jpg")
				.servicePrice(0.35)
				.maxUnities(1)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.15)
				.color(EColor.RED)
				.material(EMaterial.RESIN)
				.userEntity(manufacturer)
				.build();
			Printer printer5 = Printer.builder()
				.modelName("Eleego Saturn 3")
				.printerLocation("Carrer de Ferrer i Guàrdia, 13-1, 08902 L'Hospitalet de Llobregat, Barcelona")
				.printerType(EPrinterType.DLP)
				.urlPhoto("https://storage.googleapis.com/3dhub_isst/printers/Elegoo%20Saturn%203.jpg")
				.servicePrice(0.5)
				.maxUnities(1)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.2)
				.color(EColor.RED)
				.material(EMaterial.RESIN)
				.userEntity(manufacturer2)
				.build();
			Printer printer6 = Printer.builder()
				.modelName("Flashforge Hunter")
				.printerLocation("San Bartolome Kalea, nº 6, 1º, 20006 Donostia, Gipuzkoa")
				.printerType(EPrinterType.DLP)
				.urlPhoto("https://storage.googleapis.com/3dhub_isst/printers/Flashforge.jpg")
				.servicePrice(0.55)
				.maxUnities(1)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.2)
				.color(EColor.RED)
				.material(EMaterial.RESIN)
				.userEntity(manufacturer2)
				.build();
			Printer printer7 = Printer.builder()
				.modelName("Prusa SL1")
				.printerLocation("Calle de Don Pelayo, 34F, 40260 Fuentepelayo, Segovia")
				.printerType(EPrinterType.DLP)
				.urlPhoto("https://storage.googleapis.com/3dhub_isst/printers/printer3d.jpg")
				.servicePrice(0.45)
				.maxUnities(1)
				.manufacturationSpeed("60")
				.maxWidth(220.0)
				.maxHeight(250.0)
				.printerPrecision(0.2)
				.color(EColor.RED)
				.material(EMaterial.RESIN)
				.userEntity(manufacturer2)
				.build();


/**
 * Creación de pedidos
 */

			Order order = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.KART)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(6.5)
				.productPrice(2.0)
				.userEntity(designer)
				.printer(printer)
				.build();
			Order order2 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.PAY)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(6.5)
				.productPrice(2.0)
				.userEntity(designer)
				.printer(printer2)
				.build();
			Order order3 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.SEND)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(6.5)
				.productPrice(2.0)
				.userEntity(designer)
				.printer(printer3)
				.build();
			Order order4 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.DELIVERED)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(6.5)
				.productPrice(2.0)
				.userEntity(designer)
				.printer(printer4)
				.build();

			Order order5 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.DELIVERED)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(6.5)
				.productPrice(2.0)
				.userEntity(designer)
				.printer(printer5)
				.build();

			Order order6 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.DELIVERED)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(6.5)
				.productPrice(2.0)
				.userEntity(designer)
				.printer(printer)
				.build();
			Order order7 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.DELIVERED)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(6.5)
				.productPrice(2.0)
				.userEntity(designer)
				.printer(printer2)
				.build();
			Order order8 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.DELIVERED)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(10.0)
				.productPrice(20.0)
				.userEntity(designer)
				.printer(printer3)
				.build();
			Order order9 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.DELIVERED)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(10.0)
				.productPrice(20.0)
				.userEntity(designer)
				.printer(printer4)
				.build();
			Order order10 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.DELIVERED)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(10.0)
				.productPrice(20.0)
				.userEntity(designer)
				.printer(printer5)
				.build();
			Order order11 = Order.builder()
				.orderDate(new Date(System.currentTimeMillis()))
				.quantity(2)
				.address("Calle de la Princesa, 1, 28008 Madrid, España")
				.specs("specs1")
				.manufacturerDate(new Date(System.currentTimeMillis()))
				.file(null)
				.status(EStatus.DELIVERED)
				.deliveryDate(new Date(System.currentTimeMillis()))
				.deliveryPrice(10.0)
				.productPrice(20.0)
				.userEntity(designer)
				.printer(printer6)
				.build();

/**
 * Creación de reseñas
 */

			Ratings rating = Ratings.builder()
				.date(new Date(System.currentTimeMillis()))
				.productRating(5)
				.manufacturerRating(3)
				.textRating("¡Increíble servicio de impresión 3D! Mi pedido llegó antes de lo esperado y la calidad del producto final superó todas mis expectativas. Definitivamente recomendaré esta empresa a amigos y colegas.")
				.urlPhoto("https://storage.googleapis.com/3dhub_isst/ratings/ZBrush-ScreenGrab01.jpg")
				.order(order5)
				.build();
			Ratings rating2 = Ratings.builder()
				.date(new Date(System.currentTimeMillis()))
				.productRating(4)
				.manufacturerRating(3)
				.textRating("Estoy muy impresionado con la atención al cliente y la calidad del trabajo realizado. El equipo fue muy receptivo a mis necesidades y me guió a lo largo de todo el proceso de impresión. ¡No podría estar más feliz con el resultado final!")
				.urlPhoto("https://storage.googleapis.com/3dhub_isst/ratings/toy.jpg")
				.order(order6)
				.build();		
			Ratings rating3 = Ratings.builder()
				.date(new Date(System.currentTimeMillis()))
				.productRating(2)
				.manufacturerRating(5)
				.textRating("Mi experiencia con este servicio de impresión 3D fue excepcional. Desde el fácil proceso de carga de archivos hasta la entrega puntual, todo fue perfecto. Los detalles y la precisión en la impresión son impresionantes. ¡Definitivamente volveré a utilizar este servicio en el futuro!")
				.urlPhoto("https://storage.googleapis.com/3dhub_isst/ratings/toy.jpg")
				.order(order7)
				.build();		
			Ratings rating4 = Ratings.builder()
				.date(new Date(System.currentTimeMillis()))
				.productRating(3)
				.manufacturerRating(3)
				.textRating("¡La mejor impresión 3D que he recibido hasta ahora! El equipo fue extremadamente profesional y el resultado final fue exactamente lo que había imaginado. ¡Gracias por hacer realidad mi proyecto!")
				.urlPhoto("https://storage.googleapis.com/3dhub_isst/ratings/toy.jpg")
				.order(order8)
				.build();		
			Ratings rating5 = Ratings.builder()
				.date(new Date(System.currentTimeMillis()))
				.productRating(2)
				.manufacturerRating(5)
				.textRating("Estoy muy satisfecho con el servicio de impresión 3D que recibí. La calidad del producto final fue excepcional y el precio era muy competitivo. Sin duda volveré a confiar en esta empresa para futuros proyectos de impresión.)")
				.urlPhoto("https://storage.googleapis.com/3dhub_isst/ratings/toy.jpg")
				.order(order9)
				.build();		
			Ratings rating6 = Ratings.builder()
				.date(new Date(System.currentTimeMillis()))
				.productRating(5)
				.manufacturerRating(2)
				.textRating("¡Increíblemente impresionado con la rapidez y la calidad del servicio! Mi pedido fue completado en un tiempo récord y la atención al detalle en la impresión fue asombrosa. ¡Definitivamente recomendaré esta empresa a cualquiera que necesite servicios de impresión 3D!")
				.urlPhoto("https://storage.googleapis.com/3dhub_isst/ratings/toy.jpg")
				.order(order10)
				.build();		
			Ratings rating7 = Ratings.builder()
				.date(new Date(System.currentTimeMillis()))
				.productRating(4)
				.manufacturerRating(3)
				.textRating("Excelente servicio de impresión 3D. El equipo fue muy profesional y respondió rápidamente a todas mis preguntas. La calidad del producto final fue excepcional y el precio era muy razonable. ¡No puedo esperar para trabajar con ellos de nuevo en el futuro!")
				.urlPhoto("https://storage.googleapis.com/3dhub_isst/ratings/toy.jpg")
				.order(order11)
				.build();		
				
			userRepository.save(designer);
			userRepository.save(manufacturer);
			userRepository.save(manufacturer2);
			printerRepository.save(printer);
			printerRepository.save(printer2);
			printerRepository.save(printer3);
			printerRepository.save(printer4);
			printerRepository.save(printer5);
			printerRepository.save(printer6);
			printerRepository.save(printer7);
			orderRepository.save(order);
			orderRepository.save(order2);
			orderRepository.save(order3);
			orderRepository.save(order4);
			orderRepository.save(order5);
			orderRepository.save(order6);
			orderRepository.save(order7);
			orderRepository.save(order8);
			orderRepository.save(order9);
			orderRepository.save(order10);
			orderRepository.save(order11);
			ratingsRepository.save(rating);
			ratingsRepository.save(rating2);
			ratingsRepository.save(rating3);
			ratingsRepository.save(rating4);
			ratingsRepository.save(rating5);
			ratingsRepository.save(rating6);
			ratingsRepository.save(rating7);
		};
	}

}
