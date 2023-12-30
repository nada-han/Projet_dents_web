package ma.ensa.backProject;


import ma.ensa.backProject.entities.Groupe;
import ma.ensa.backProject.repository.GroupeRepository;
import ma.ensa.backProject.service.GroupeService;
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
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
public class GroupeServiceTest {

    @Mock
    private GroupeRepository groupeRepository;

    @InjectMocks
    private GroupeService groupeService;

    @Test
    public void testCreateGroupe() {
        // Mocking data
        Groupe groupeToCreate = new Groupe(1, "AW9008", "2023");

        // Mocking repository behavior
        when(groupeRepository.save(Mockito.any(Groupe.class))).thenReturn(groupeToCreate);

        // Calling the service method
        Groupe createdGroupe = groupeService.create(groupeToCreate);

        // Assertions
        assertNotNull(createdGroupe);
        assertEquals(1, createdGroupe.getId());
        assertEquals("AW9008", createdGroupe.getCode());
        assertEquals("2023", createdGroupe.getYear());
    }

    @Test
    public void testFindById() {
        // Mocking data
        int groupId = 1;
        Groupe mockGroupe = new Groupe(1, "AW9008", "2023");

        // Mocking repository behavior
        when(groupeRepository.findById(groupId)).thenReturn(Optional.of(mockGroupe));

        // Calling the service method
        Groupe foundGroupe = groupeService.findById((long) groupId);

        // Assertions
        assertNotNull(foundGroupe);
        assertEquals(groupId, foundGroupe.getId());
        assertEquals("AW9008", foundGroupe.getCode());
        assertEquals("2023", foundGroupe.getYear());
    }

    @Test
    public void testFindAllGroupes() {
        // Mocking data
        List<Groupe> mockGroupes = new ArrayList<>();
        mockGroupes.add(new Groupe(1, "AW9008", "2023"));
        mockGroupes.add(new Groupe(2, "ATS98", "2022"));

        // Mocking repository behavior
        when(groupeRepository.findAll()).thenReturn(mockGroupes);

        // Calling the service method
        List<Groupe> groupes = groupeService.findAll();

        // Assertions
        assertEquals(2, groupes.size());


    }


}
