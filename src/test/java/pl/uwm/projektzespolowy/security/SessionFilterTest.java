package pl.uwm.projektzespolowy.security;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.FilterChain;

import static org.mockito.Mockito.*;

class SessionFilterTest {

    @Test
    void filterInternalWithValidSessionTokenShouldSetAuthenticationInSecurityContextHolder() throws Exception {
        // when
        final String sessionId = "valid-session-token";
        final String email = "test@example.com";
        final CurrentUser currentUser = mock(CurrentUser.class);
        final SessionRegistry sessionRegistry = mock(SessionRegistry.class);
        final CurrentUserService currentUserService = mock(CurrentUserService.class);
        final SessionFilter sessionFilter = new SessionFilter(sessionRegistry, currentUserService);
        final MockHttpServletRequest request = new MockHttpServletRequest();
        final MockHttpServletResponse response = new MockHttpServletResponse();
        final FilterChain filterChain = mock(FilterChain.class);
        final UsernamePasswordAuthenticationToken expectedAuthentication = new UsernamePasswordAuthenticationToken(
                currentUser,
                null
        );
        when(sessionRegistry.getEmailForSession(sessionId)).thenReturn(email);
        when(currentUserService.loadUserByUsername(email)).thenReturn(currentUser);
        // given
        request.addHeader("Authorization", sessionId);
        sessionFilter.doFilterInternal(request, response, filterChain);
        // then
        assertNotEquals(expectedAuthentication, SecurityContextHolder.getContext().getAuthentication());
        verify(filterChain).doFilter(request, response);
        verifyNoMoreInteractions(filterChain);
    }
}