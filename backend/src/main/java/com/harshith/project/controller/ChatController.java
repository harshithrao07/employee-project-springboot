package com.harshith.project.controller;

import com.harshith.project.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    // receives data from chat-room and sends it to chat-room topic
    @MessageMapping("/message") // /app/message
    @SendTo("/chatroom/public")
    public Message receivePublicMessage(@Payload Message message) {
        return message;
    }

    @MessageMapping("/private-message") //
    public Message receivePrivateMessage(@Payload Message message) {

        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/private", message); //  /user/David/private
        return message;
    }
}
