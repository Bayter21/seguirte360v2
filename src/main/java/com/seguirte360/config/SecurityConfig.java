<<<<<<< HEAD
package com.seguirte360.config;

import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.*;
import org.springframework.security.crypto.bcrypt.*;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filter(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(a -> a
                .requestMatchers("/login", "/register", "/guest", "/css/**", "/js/**").permitAll()
                .requestMatchers("/teacher/**", "/teacher").hasRole("TEACHER")
                .anyRequest().authenticated()
            )
            .formLogin(f -> f
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard", true)
                .permitAll()
            )
            .logout(l -> l
                .logoutSuccessUrl("/login")
                .permitAll()
            );
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
}
=======
package com.seguirte360.config;import org.springframework.context.annotation.*;import org.springframework.security.config.annotation.web.builders.*;import org.springframework.security.web.*;import org.springframework.security.crypto.bcrypt.*;
@Configuration public class SecurityConfig{
@Bean public SecurityFilterChain filter(HttpSecurity http)throws Exception{
http.csrf().disable().authorizeHttpRequests(a->a
.requestMatchers("/login","/register","/guest").permitAll()
.requestMatchers("/teacher/**").hasRole("TEACHER")
.anyRequest().authenticated())
.formLogin(f->f.defaultSuccessUrl("/dashboard",true)); return http.build();}
@Bean public BCryptPasswordEncoder encoder(){return new BCryptPasswordEncoder();}}
>>>>>>> d1afb8a2d6ff0391480e35400c59fef03657533c
