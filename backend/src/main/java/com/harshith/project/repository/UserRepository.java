package com.harshith.project.repository;

import com.harshith.project.auth.AuthenticateRequest;
import com.harshith.project.auth.AuthenticationResponse;
import com.harshith.project.auth.RegisterRequest;
import com.harshith.project.model.Role;
import com.harshith.project.model.User;
import com.harshith.project.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Objects;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    @Service
    @RequiredArgsConstructor
    class AuthenticationService {
        private final UserRepository repository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;
        public AuthenticationResponse register(RegisterRequest request) {
            var user = User.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .build();
            Optional<User> optionalUser = repository.findByEmail(request.getEmail());
            if(optionalUser.isPresent()) {
                return AuthenticationResponse.builder().message("Email address is already registered").build();
            }
            repository.save(user);
            var jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder().token(jwtToken).user(user).build();
        }

        public AuthenticationResponse authenticate(AuthenticateRequest request) {
            try {
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );
                var user = repository.findByEmail(request.getEmail())
                        .orElseThrow();

                if(passwordEncoder.matches(request.getPassword(), user.getPassword())){
                    var jwtToken = jwtService.generateToken(user);
                    return AuthenticationResponse.builder().token(jwtToken).user(user).build();
                } else {
                    return AuthenticationResponse.builder().message("Password entered is incorrect.").build();
                }
            } catch (Exception e) {
                return AuthenticationResponse.builder().message("Authentication failed.").build();
            }
        }
    }
}
