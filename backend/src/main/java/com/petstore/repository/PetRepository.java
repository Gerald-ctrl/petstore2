package com.petstore.repository;

import com.petstore.model.Pet;
import com.petstore.model.PetStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    @Query("""
        SELECT p FROM Pet p
        WHERE (:species IS NULL OR LOWER(p.species) = LOWER(:species))
          AND (:status IS NULL OR p.status = :status)
          AND (:minPrice IS NULL OR p.price >= :minPrice)
          AND (:maxPrice IS NULL OR p.price <= :maxPrice)
          AND (:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
               OR LOWER(p.breed) LIKE LOWER(CONCAT('%', :search, '%')))
        ORDER BY p.createdAt DESC
        """)
    List<Pet> findWithFilters(
            @Param("species") String species,
            @Param("status") PetStatus status,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("search") String search
    );
}
