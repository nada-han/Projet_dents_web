package ma.ensa.backProject;


import ma.ensa.backProject.entities.Tooth;
import ma.ensa.backProject.repository.ToothRepository;
import ma.ensa.backProject.service.ToothService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
public class ToothServiceTest {

    @Mock
    private ToothRepository toothRepository;

    @InjectMocks
    private ToothService toothService;

    @Test
    public void testCreateTooth() {
        // Mocking data
        Tooth toothToCreate = new Tooth(1, "Molar");

        // Mocking repository behavior
        when(toothRepository.save(Mockito.any(Tooth.class))).thenReturn(toothToCreate);

        // Calling the service method
        Tooth createdTooth = toothService.create(toothToCreate);

        // Assertions
        assertNotNull(createdTooth);
        assertEquals(1, createdTooth.getId());
        assertEquals("Molar", createdTooth.getName());
    }

    @Test
    public void testFindById() {
        // Mocking data
        int toothId = 1;
        Tooth mockTooth = new Tooth(toothId, "Molar");

        // Mocking repository behavior
        when(toothRepository.findById(toothId)).thenReturn(Optional.of(mockTooth));

        // Calling the service method
        Tooth foundTooth = toothService.findById((long) toothId);

        // Assertions
        assertNotNull(foundTooth);
        assertEquals(toothId, foundTooth.getId());
        assertEquals("Molar", foundTooth.getName());
    }

    @Test
    public void testFindAllTeeth() {
        // Mocking data
        List<Tooth> mockTeeth = new ArrayList<>();
        mockTeeth.add(new Tooth(1, "Molar"));
        mockTeeth.add(new Tooth(2, "Incisor"));

        // Mocking repository behavior
        when(toothRepository.findAll()).thenReturn(mockTeeth);

        // Calling the service method
        List<Tooth> teeth = toothService.findAll();

        // Assertions
        assertEquals(2, teeth.size());
        assertEquals("Molar", teeth.get(0).getName());
        assertEquals("Incisor", teeth.get(1).getName());
    }


}

