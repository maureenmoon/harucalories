package com.study.spring.domain.security.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.study.spring.domain.security.handler.CustomAccessDeniedHandler;
import com.study.spring.domain.security.util.JWTCheckFilter;
import com.study.spring.domain.security.util.JWTUtil;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@Log4j2
@RequiredArgsConstructor
public class SecurityConfig {
	@Autowired
    private JWTUtil jwtUtil;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        log.info("🔐 Loading Security Configuration...");
        
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            // ✅ REMOVED: .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // This allows sessions for cookie-based authentication
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/members/login",
                    "/api/members/multipart",         // ✅ this is your signup URL
                    "/api/members/check-email",
                    "/api/members/check-nickname",
                    "/api/members/search-nickname",
                    "/api/members/reset-password",
                    "/api/members/refresh",          // ✅ allow refresh without auth
                    "/api/members/logout",           // ✅ allow logout without auth
                    "/api/members/test-cookies",     // ✅ test endpoint
                    "/api/members/recommended-calories", // ✅ recommended calories endpoint
                    "/api/health"                    // ✅ health check endpoint
                ).permitAll()
                // ✅ ADD THIS LINE to explicitly allow authenticated users
                .requestMatchers("/api/members/me").hasAnyRole("USER", "ADMIN")
                // ✅ Protect everything else
                .anyRequest().authenticated()
            )
            .addFilterBefore(new JWTCheckFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling(ex -> ex.accessDeniedHandler(new CustomAccessDeniedHandler()));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(Arrays.asList("http://localhost:5173", "http://localhost:5174", "http://localhost:5175")); 
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.addAllowedHeader("*");
        config.setAllowCredentials(true); // Required for cookies
        config.setExposedHeaders(Arrays.asList("Set-Cookie")); // Allow frontend to see Set-Cookie headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
} 