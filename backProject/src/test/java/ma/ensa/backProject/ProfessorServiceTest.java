package ma.ensa.backProject;

import ma.ensa.backProject.entities.Professor;
import ma.ensa.backProject.repository.ProfessorRepository;
import ma.ensa.backProject.service.ProfessorService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class ProfessorServiceTest {

    @Mock
    private ProfessorRepository professorRepository;

    @InjectMocks
    private ProfessorService professorService;

    @Test
    public void testCreateProfessor() {
        Professor professorToCreate = new Professor("prof");

        // Mocking the behavior of professorRepository.save
        Mockito.when(professorRepository.save(professorToCreate)).thenReturn(professorToCreate);

        Professor createdProfessor = professorService.create(professorToCreate);

        // Verify that professorRepository.save was called with the expected professor object
        Mockito.verify(professorRepository, Mockito.times(1)).save(professorToCreate);

        // Assert that the returned professor is the same as the one we created
        assertEquals(professorToCreate, createdProfessor);
    }



    @Test
    public void testDeleteProfessor() {
        Professor professorToDelete = new Professor("prof");

        // Mocking the behavior of professorRepository.delete
        Mockito.doNothing().when(professorRepository).delete(professorToDelete);

        boolean result = professorService.delete(professorToDelete);

        // Verify that professorRepository.delete was called with the expected professor object
        Mockito.verify(professorRepository, Mockito.times(1)).delete(professorToDelete);

        // Assert that the result is true (deletion successful)
        assertTrue(result);
    }
}
