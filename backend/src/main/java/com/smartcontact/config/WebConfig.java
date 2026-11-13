package com.smartcontact.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Jab bhi koi http://localhost:8080/uploads/... kholega, to wo local 'uploads' folder se file dega
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}
