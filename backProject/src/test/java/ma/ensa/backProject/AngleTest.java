package ma.ensa.backProject;


import ma.ensa.backProject.entities.Angle;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class AngleTest {

    @Test
    void testGetterAndSetters() {
        Angle angle = new Angle();

        // Set values using setters
        angle.setId(1L);
        angle.setAngleRight(30.0);
        angle.setAngleLeft(45.0);
        angle.setAngleDeConvergence(60.0);

        // Verify values using getters
        assertEquals(1L, angle.getId());
        assertEquals(30.0, angle.getAngleRight());
        assertEquals(45.0, angle.getAngleLeft());
        assertEquals(60.0, angle.getAngleDeConvergence());
    }




}

