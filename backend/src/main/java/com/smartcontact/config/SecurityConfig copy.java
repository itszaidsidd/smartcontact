// package com.smartcontact.config;

// import com.smartcontact.security.CustomUserDetailsServiceImpl;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// import org.springframework.security.config.Customizer;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import java.util.List;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     // 1. Password ko safe (encrypt) karne ke liye machine
//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     // 2. Apni custom service ka bean banana
//     @Bean
//     public UserDetailsService userDetailsService() {
//         return new CustomUserDetailsServiceImpl();
//     }

//     // 3. Helper aur Guard ko aapas me jodne wala bridge (Provider)
//     @Bean
//     public DaoAuthenticationProvider authenticationProvider() {
//         DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//         provider.setUserDetailsService(userDetailsService());
//         provider.setPasswordEncoder(passwordEncoder());
//         return provider;
//     }

//     // 4. Authentication Manage karne wali main class (Login controller me kaam aayegi)
//     @Bean
//     public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
//         return config.getAuthenticationManager();
//     }

//     // 5. Main Gate ki Rules Book (Security Filter Chain)
//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource())) // React ke liye CORS on kiya
//             .csrf(csrf -> csrf.disable()) // Stateless APIs/React ke liye CSRF band karna zaroori hai
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/user", "/auth/login").permitAll() // Registration aur Login public hain
//                 .anyRequest().authenticated() // Baaki saare URLs ke liye login zaroori hai
//             )
//             // React ke sath session save nahi karte, har request fresh hoti hai (Stateless)
//             .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .httpBasic(Customizer.withDefaults()); // Basic auth test karne ke liye (Shuruat me)

//         http.authenticationProvider(authenticationProvider());

//         return http.build();
//     }

//     // 6. React App ko allow karne ki settings
//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:5173")); // React URLs
//         configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//         configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
//         configuration.setAllowCredentials(true);

//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }
// }
