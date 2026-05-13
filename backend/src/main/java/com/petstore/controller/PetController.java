package com.petstore.controller;

import com.petstore.dto.PetDTO;
import com.petstore.service.PetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;

    @GetMapping
    public ResponseEntity<List<PetDTO>> getAll(
            @RequestParam(required = false) String species,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String search
    ) {
        return ResponseEntity.ok(petService.findAll(species, status, minPrice, maxPrice, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDTO> getById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(petService.findById(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<PetDTO> create(@Valid @RequestBody PetDTO dto) {
        PetDTO created = petService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetDTO> update(@PathVariable Long id, @Valid @RequestBody PetDTO dto) {
        try {
            return ResponseEntity.ok(petService.update(id, dto));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            petService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
