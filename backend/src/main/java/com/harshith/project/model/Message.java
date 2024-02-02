package com.harshith.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    private String senderName;
    private String receiverName;
    private String message;
    private Status status;
}
