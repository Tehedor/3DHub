package com.dhub.backend.services;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.dhub.backend.controllers.request.IpInfoDto;
import com.exceptions.GenericException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
public class IpInfoService {

	@Value("${token.ip.info}")
	private String TOKEN_IP_INFO;

	public IpInfoDto getDataFromIpInfo(String ip) {

		if (ip == null || ip.contains(" ") || ip.length() == 0 || ip.length() > 100 || ip.isEmpty() || ip.isBlank()) {
			throw new GenericException();
		}

		// get data from the URL
		String webUrl = "https://ipinfo.io/" + ip + "/json?token=" + TOKEN_IP_INFO;
		URL url = null;

		try {
			url = new URL(webUrl);
		} catch (MalformedURLException e) {
			throw new GenericException();
		}

		HttpURLConnection conn = null;

		try {
			conn = (HttpURLConnection) url.openConnection();
		} catch (IOException e) {
			throw new GenericException();
		}

		try {
			conn.setRequestMethod("GET");
		} catch (ProtocolException e) {
			throw new GenericException();
		}

		BufferedReader buffReader = null;

		try {
			buffReader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		} catch (IOException e) {
			throw new GenericException();
		}

		String line;
		StringBuffer response = new StringBuffer();

		try {
			while ((line = buffReader.readLine()) != null) {
				response.append(line);
			}
		} catch (IOException e) {
			throw new GenericException();
		}

		ObjectMapper objMap = new ObjectMapper();
		IpInfoDto ipInfo = new IpInfoDto();

		try {
			ipInfo = objMap.readValue(response.toString(), IpInfoDto.class);

			ipInfo.setCountryFullName(findCountryFullName(ipInfo.getCountry()));

		} catch (JsonProcessingException e) {
			throw new GenericException();
		}

		return ipInfo;

	}

	// additional method to find and return country full name
	public String findCountryFullName(String country) {

		switch (country) {

		// A

		case "AF":
			return "Afghanistan";
		case "AX":
			return "Aland Islands";
		case "AL":
			return "Albania";
		case "DZ":
			return "Algeria";
		case "AS":
			return "American Samoa";
		case "AD":
			return "Andorra";
		case "AO":
			return "Angola";
		case "AI":
			return "Anguilla";
		case "AQ":
			return "Antarctica";
		case "AG":
			return "Antigua and Barbuda";
		case "AR":
			return "Argentina";
		case "AM":
			return "Armenia";
		case "AW":
			return "Aruba";
		case "AU":
			return "Australia";
		case "AT":
			return "Austria";
		case "AZ":
			return "Azerbaijan";

		// B

		case "BS":
			return "Bahamas";
		case "BH":
			return "Bahrain";
		case "BD":
			return "Bangladesh";
		case "BB":
			return "Barbados";
		case "BY":
			return "Belarus";
		case "BE":
			return "Belgium";
		case "BZ":
			return "Belize";
		case "BJ":
			return "Benin";
		case "BM":
			return "Bermuda";
		case "BT":
			return "Bhutan";
		case "BO":
			return "Bolivia";
		case "BA":
			return "Bosnia and Herzegovina";
		case "BW":
			return "Botswana";
		case "BV":
			return "Bouvet Island";
		case "BR":
			return "Brazil";
		case "VG":
			return "British Virgin Islands";
		case "IO":
			return "British Indian Ocean Territory";
		case "BN":
			return "Brunei Darussalam";
		case "BG":
			return "Bulgaria";
		case "BF":
			return "Burkina Faso";
		case "BI":
			return "Burundi";

		// C

		case "KH":
			return "Cambodia";
		case "CM":
			return "Cameroon";
		case "CA":
			return "Canada";
		case "CV":
			return "Cape Verde";
		case "KY":
			return "Cayman Islands";
		case "CF":
			return "Central African Republic";
		case "TD":
			return "Chad";
		case "CL":
			return "Chile";
		case "CN":
			return "China";
		case "HK":
			return "Hong Kong, SAR China";
		case "MO":
			return "Macao, SAR China";
		case "CX":
			return "Christmas Island";
		case "CC":
			return "Cocos (Keeling) Islands";
		case "CO":
			return "Colombia";
		case "KM":
			return "Comoros";
		case "CG":
			return "Congo (Brazzaville)";
		case "CD":
			return "Congo, (Kinshasa)";
		case "CK":
			return "Cook Islands";
		case "CR":
			return "Costa Rica";
		case "CI":
			return "Côte d'Ivoire";
		case "HR":
			return "Croatia";
		case "CU":
			return "Cuba";
		case "CY":
			return "Cyprus";
		case "CZ":
			return "Czech Republic";

		// D

		case "DK":
			return "Denmark";
		case "DJ":
			return "Djibouti";
		case "DM":
			return "Dominica";
		case "DO":
			return "Dominican Republic";

		// E

		case "EC":
			return "Ecuador";
		case "EG":
			return "Egypt";
		case "SV":
			return "El Salvador";
		case "GQ":
			return "Equatorial Guinea";
		case "ER":
			return "Eritrea";
		case "EE":
			return "Estonia";
		case "ET":
			return "Ethiopia";

		// F

		case "FK":
			return "Falkland Islands (Malvinas)";
		case "FO":
			return "Faroe Islands";
		case "FJ":
			return "Fiji";
		case "FI":
			return "Finland";
		case "FR":
			return "France";
		case "GF":
			return "French Guiana";
		case "PF":
			return "French Polynesia";
		case "TF":
			return "French Southern Territories";

		// G

		case "GA":
			return "Gabon";
		case "GM":
			return "Gambia";
		case "GE":
			return "Georgia";
		case "DE":
			return "Germany";
		case "GH":
			return "Ghana";
		case "GI":
			return "Gibraltar";
		case "GR":
			return "Greece";
		case "GL":
			return "Greenland";
		case "GD":
			return "Grenada";
		case "GP":
			return "Guadeloupe";
		case "GU":
			return "Guam";
		case "GT":
			return "Guatemala";
		case "GG":
			return "Guernsey";
		case "GN":
			return "Guinea";
		case "GW":
			return "Guinea-Bissau";
		case "GY":
			return "Guyana";

		// H

		case "HT":
			return "Haiti";
		case "HM":
			return "Heard and Mcdonald Islands";
		case "VA":
			return "Holy See (Vatican City State)";
		case "HN":
			return "Honduras";
		case "HU":
			return "Hungary";

		// I

		case "IS":
			return "Iceland";
		case "IN":
			return "India";
		case "ID":
			return "Indonesia";
		case "IR":
			return "Iran";
		case "IQ":
			return "Iraq";
		case "IE":
			return "Ireland";
		case "IM":
			return "Isle of Man";
		case "IL":
			return "Israel";
		case "IT":
			return "Italy";

		// J

		case "JM":
			return "Jamaica";
		case "JP":
			return "Japan";
		case "JE":
			return "Jersey";
		case "JO":
			return "Jordan";

		// K

		case "KZ":
			return "Kazakhstan";
		case "KE":
			return "Kenya";
		case "KI":
			return "Kiribati";
		case "KP":
			return "Korea (North)";
		case "KR":
			return "Korea (South)";
		case "KW":
			return "Kuwait";
		case "KG":
			return "Kyrgyzstan";

		// L

		case "LA":
			return "Lao PDR";
		case "LV":
			return "Latvia";
		case "LB":
			return "Lebanon";
		case "LS":
			return "Lesotho";
		case "LR":
			return "Liberia";
		case "LY":
			return "Libya";
		case "LI":
			return "Liechtenstein";
		case "LT":
			return "Lithuania";
		case "LU":
			return "Luxembourg";

		// M

		case "MK":
			return "Macedonia";
		case "MG":
			return "Madagascar";
		case "MW":
			return "Malawi";
		case "MY":
			return "Malaysia";
		case "MV":
			return "Maldives";
		case "ML":
			return "Mali";
		case "MT":
			return "Malta";
		case "MH":
			return "Marshall Islands";
		case "MQ":
			return "Martinique";
		case "MR":
			return "Mauritania";
		case "MU":
			return "Mauritius";
		case "YT":
			return "Mayotte";
		case "MX":
			return "Mexico";
		case "FM":
			return "Micronesia";
		case "MD":
			return "Moldova";
		case "MC":
			return "Monaco";
		case "MN":
			return "Mongolia";
		case "ME":
			return "Montenegro";
		case "MS":
			return "Montserrat";
		case "MA":
			return "Morocco";
		case "MZ":
			return "Mozambique";
		case "MM":
			return "Myanmar";

		// N

		case "NA":
			return "Namibia";
		case "NR":
			return "Nauru";
		case "NP":
			return "Nepal";
		case "NL":
			return "Netherlands";
		case "AN":
			return "Netherlands Antilles";
		case "NC":
			return "New Caledonia";
		case "NZ":
			return "New Zealand";
		case "NI":
			return "Nicaragua";
		case "NE":
			return "Niger";
		case "NG":
			return "Nigeria";
		case "NU":
			return "Niue";
		case "NF":
			return "Norfolk Island";
		case "MP":
			return "Northern Mariana Islands";
		case "NO":
			return "Norway";

		// O

		case "OM":
			return "Oman";

		// P

		case "PK":
			return "Pakistan";
		case "PW":
			return "Palau";
		case "PS":
			return "Palestinian Territory";
		case "PA":
			return "Panama";
		case "PG":
			return "Papua New Guinea";
		case "PY":
			return "Paraguay";
		case "PE":
			return "Peru";
		case "PH":
			return "Philippines";
		case "PL":
			return "Poland";
		case "PT":
			return "Portugal";
		case "PR":
			return "Puerto Rico";

		// Q

		case "QA":
			return "Qatar";

		// R

		case "RE":
			return "Réunion";
		case "RO":
			return "Romania";
		case "RU":
			return "Russia";
		case "RW":
			return "Rwanda";

		// S

		case "BL":
			return "Saint-Barthélemy";
		case "SH":
			return "Saint Helena";
		case "KN":
			return "Saint Kitts and Nevis";
		case "LC":
			return "Saint Lucia";
		case "MF":
			return "Saint-Martin";
		case "PM":
			return "Saint Pierre and Miquelon";
		case "VC":
			return "Saint Vincent and Grenadines";
		case "WS":
			return "Samoa";
		case "SM":
			return "San Marino";
		case "ST":
			return "Sao Tome and Principe";
		case "SA":
			return "Saudi Arabia";
		case "SN":
			return "Senegal";
		case "RS":
			return "Serbia";
		case "SC":
			return "Seychelles";
		case "SL":
			return "Sierra Leone";
		case "SG":
			return "Singapore";
		case "SK":
			return "Slovakia";
		case "SI":
			return "Slovenia";
		case "SB":
			return "Solomon Islands";
		case "SO":
			return "Somalia";
		case "ZA":
			return "South Africa";
		case "GS":
			return "South Georgia and the South Sandwich Islands";
		case "SS":
			return "South Sudan";
		case "ES":
			return "Spain";
		case "LK":
			return "Sri Lanka";
		case "SD":
			return "Sudan";
		case "SR":
			return "Suriname";
		case "SJ":
			return "Svalbard and Jan Mayen Islands";
		case "SZ":
			return "Swaziland";
		case "SE":
			return "Sweden";
		case "CH":
			return "Switzerland";
		case "SY":
			return "Syria";

		// T

		case "TW":
			return "Taiwan";
		case "TJ":
			return "Tajikistan";
		case "TZ":
			return "Tanzania";
		case "TH":
			return "Thailand";
		case "TL":
			return "Timor-Leste";
		case "TG":
			return "Togo";
		case "TK":
			return "Tokelau";
		case "TO":
			return "Tonga";
		case "TT":
			return "Trinidad and Tobago";
		case "TN":
			return "Tunisia";
		case "TR":
			return "Turkey";
		case "TM":
			return "Turkmenistan";
		case "TC":
			return "Turks and Caicos Islands";
		case "TV":
			return "Tuvalu";

		// U

		case "UG":
			return "Uganda";
		case "UA":
			return "Ukraine";
		case "AE":
			return "United Arab Emirates";
		case "GB":
			return "United Kingdom";
		case "US":
			return "United States";
		case "UM":
			return "US Minor Outlying Islands";
		case "UY":
			return "Uruguay";
		case "UZ":
			return "Uzbekistan";

		// V

		case "VU":
			return "Vanuatu";
		case "VE":
			return "Venezuela";
		case "VN":
			return "Viet Nam";
		case "VI":
			return "Virgin Islands, US";

		// W

		case "WF":
			return "Wallis and Futuna Islands";
		case "EH":
			return "Western Sahara";

		// Y-Z

		case "YE":
			return "Yemen";
		case "ZM":
			return "Zambia";
		case "ZW":
			return "Zimbabwe";

		default:
			return null;
		}
	}

}
