package ma.ensa.backProject;


import ma.ensa.backProject.entities.Angle;
import ma.ensa.backProject.repository.AngleRepository;
import ma.ensa.backProject.service.AngleService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
public class AngleServiceTest {

    @Mock
    private AngleRepository angleRepository;

    @InjectMocks
    private AngleService angleService;





    @Test
    public void testFindAllAngles() {
        // Mocking data
        List<Angle> mockAngles = new ArrayList<>();
        mockAngles.add(new Angle(121, 45, 166));
        mockAngles.add(new Angle(122, 60, 182));

        // Mocking repository behavior
        when(angleRepository.findAll()).thenReturn(mockAngles);

        // Calling the service method
        List<Angle> angles = angleService.findAll();

        // Assertions
        assertEquals(2, angles.size());

    }


}

