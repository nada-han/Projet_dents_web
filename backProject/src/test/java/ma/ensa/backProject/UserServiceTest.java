package ma.ensa.backProject;

import ma.ensa.backProject.entities.User;
import ma.ensa.backProject.repository.UserRepository;
import ma.ensa.backProject.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void testCreateUser() {
        User userToCreate = new User(7,"nadahan", "nada","nada","hansal","im33");

        // Mocking the behavior of userRepository.save
        Mockito.when(userRepository.save(userToCreate)).thenReturn(userToCreate);

        User createdUser = userService.create(userToCreate);

        // Verify that userRepository.save was called with the expected user object
        Mockito.verify(userRepository, Mockito.times(1)).save(userToCreate);

        // Assert that the returned user is the same as the one we created
        assertEquals(userToCreate, createdUser);
    }



    @Test
    public void testFindUserById() {
        long userId = 7;
        User expectedUser = new User(7,"nadahan", "nada","nada","hansal","im33");

        // Mocking the behavior of userRepository.findById
        Mockito.when(userRepository.findById((int) userId)).thenReturn(Optional.of(expectedUser));

        User result = userService.findById(userId);

        // Verify that userRepository.findById was called with the expected user ID
        Mockito.verify(userRepository, Mockito.times(1)).findById((int) userId);

        // Assert that the result is the expected user
        assertEquals(expectedUser, result);
    }

    @Test
    public void testFindAllUsers() {
        // Mocking the behavior of userRepository.findAll
        List<User> expectedUsers = Arrays.asList(new User(7,"nadahan", "nada","nada","hansal","im33"),
                new User(8,"nouha", "nouhaila","nouhaila","khabbachi","im344"));
        Mockito.when(userRepository.findAll()).thenReturn(expectedUsers);

        List<User> result = userService.findAll();

        // Verify that userRepository.findAll was called
        Mockito.verify(userRepository, Mockito.times(1)).findAll();

        // Assert that the result is the expected list of users
        assertEquals(expectedUsers, result);
    }




}

