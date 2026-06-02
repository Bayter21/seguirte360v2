package com.seguirte360.controller;import org.springframework.stereotype.*;import org.springframework.web.bind.annotation.*;
@Controller public class GuestController{
@GetMapping("/guest") public String guest(){return "guest";}}
