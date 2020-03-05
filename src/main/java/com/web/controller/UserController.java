package com.web.controller;



import com.web.dao.UserRepository;
import com.web.entity.User;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping(value = "/")
public class UserController {

    private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }





    @PostMapping(value = "/user/create")
    @ResponseStatus(HttpStatus.CREATED)//201
    public void create(
            @RequestParam("first_name") String first_name,
            @RequestParam("last_name") String last_name) {
        userRepository.saveAndFlush(new User(first_name, last_name));
    }

    @RequestMapping(value = "/user/get/all", method = RequestMethod.GET)
    public @ResponseBody String getAll() {
        List<User> users = userRepository.findAll();

        JSONArray body = new JSONArray();
        for (User user : users){
            JSONObject item = new JSONObject();
            item.put("id", user.getId());
            item.put("first_name", user.getFirstName());
            item.put("last_name", user.getLastName());
            body.add(item);
        }
        return body.toJSONString();
    }
}
