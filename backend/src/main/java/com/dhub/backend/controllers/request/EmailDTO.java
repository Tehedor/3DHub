package com.dhub.backend.controllers.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class EmailDTO {

    private String[] toUser;

    private String subject;

    private String message;
}
