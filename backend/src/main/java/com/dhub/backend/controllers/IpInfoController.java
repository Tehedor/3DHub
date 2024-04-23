package com.dhub.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dhub.backend.controllers.request.IpInfoDto;
import com.dhub.backend.services.IpInfoService;
import com.exceptions.GenericException;



@CrossOrigin(origins = "${url.fe.cross.origin}")
@RestController
@RequestMapping("/api/ip")
public class IpInfoController {

	@Autowired
	private IpInfoService ipInfoService;
	
	// Custom exceptions response
	@ExceptionHandler({ GenericException.class })
	public ResponseEntity<String> handleGenericError() {
		final String message = "Error";
		return new ResponseEntity<String>(message, HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping("/info")
	public IpInfoDto getIpInfo(@RequestBody IpInfoDto ipInfo) {
		return ipInfoService.getDataFromIpInfo(ipInfo.getIp());
	}
}