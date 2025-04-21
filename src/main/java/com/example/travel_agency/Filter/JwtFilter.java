package com.example.travel_agency.Filter;

import com.example.travel_agency.service.JWTService;
import com.example.travel_agency.service.MyUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private MyUserDetailService myUserDetailService;

    private static final List<String> EXCLUDED_PATHS = List.of(
            "/api/auth/register",
            "/auth/login",
            "/api/user/addUser",
            "/v3/api-docs",
            "/swagger-ui",
            "/swagger-ui.html",
            "/api-docs",
            "/api/hotels",
            "/api/travel-packages"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String requestURI = request.getRequestURI();

        if (isExcludedPath(requestURI)) {
            filterChain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            sendError(response, "Missing or invalid Authorization header", HttpStatus.UNAUTHORIZED);
            return;
        }

        try {
            final String token = authHeader.substring(7);
            final String username = jwtService.extractUsername(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = myUserDetailService.loadUserByUsername(username);

                if (jwtService.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

            filterChain.doFilter(request, response);

        } catch (UsernameNotFoundException e) {
            sendError(response, "User not found", HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            sendError(response, "Invalid token: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    private boolean isExcludedPath(String path) {
        return EXCLUDED_PATHS.stream().anyMatch(path::startsWith);
    }

    private void sendError(HttpServletResponse response, String message, HttpStatus status)
            throws IOException {
        response.setStatus(status.value());
        response.setContentType("application/json");
        response.getWriter().write(
                String.format("{\"error\": \"%s\", \"message\": \"%s\"}",
                        status.getReasonPhrase(),
                        message)
        );
    }
}