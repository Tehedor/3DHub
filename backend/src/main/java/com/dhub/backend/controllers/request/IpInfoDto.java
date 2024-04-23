package com.dhub.backend.controllers.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class IpInfoDto {

	// from ipinfo
	private String ip;
	private String hostname;
	private String city;
	private String region;
	private String country;
	private String loc;
	private String org;
	private String postal;
	private String timezone;
	
	// additional field
	private String countryFullName;
}