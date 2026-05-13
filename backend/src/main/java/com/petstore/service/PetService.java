package com.petstore.service;

import com.petstore.dto.PetDTO;
import com.petstore.model.Pet;
import com.petstore.model.PetStatus;
import com.petstore.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PetService {

    private final PetRepository petRepository;

    public List<PetDTO> findAll(String species, String status, BigDecimal minPrice, BigDecimal maxPrice, String search) {
        PetStatus petStatus = null;
        if (status != null && !status.isBlank()) {
            try {
                petStatus = PetStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException ignored) {
                // invalid status — ignore filter
            }
        }

        String speciesParam = (species != null && !species.isBlank()) ? species : null;
        String searchParam = (search != null && !search.isBlank()) ? search : null;

        return petRepository.findWithFilters(speciesParam, petStatus, minPrice, maxPrice, searchParam)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public PetDTO findById(Long id) {
        return petRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Pet not found with id: " + id));
    }

    @Transactional
    public PetDTO create(PetDTO dto) {
        Pet pet = toEntity(dto);
        pet.setId(null); // ensure insert
        if (pet.getStatus() == null) {
            pet.setStatus(PetStatus.AVAILABLE);
        }
        return toDTO(petRepository.save(pet));
    }

    @Transactional
    public PetDTO update(Long id, PetDTO dto) {
        Pet existing = petRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Pet not found with id: " + id));

        existing.setName(dto.getName());
        existing.setSpecies(dto.getSpecies());
        existing.setBreed(dto.getBreed());
        existing.setAgeMonths(dto.getAgeMonths());
        existing.setPrice(dto.getPrice());
        existing.setStatus(dto.getStatus() != null ? dto.getStatus() : existing.getStatus());
        existing.setDescription(dto.getDescription());
        existing.setImageUrl(dto.getImageUrl());

        return toDTO(petRepository.save(existing));
    }

    @Transactional
    public void delete(Long id) {
        if (!petRepository.existsById(id)) {
            throw new NoSuchElementException("Pet not found with id: " + id);
        }
        petRepository.deleteById(id);
    }

    // ── Mappers ─────────────────────────────────────────────────────────────

    private PetDTO toDTO(Pet pet) {
        return PetDTO.builder()
                .id(pet.getId())
                .name(pet.getName())
                .species(pet.getSpecies())
                .breed(pet.getBreed())
                .ageMonths(pet.getAgeMonths())
                .price(pet.getPrice())
                .status(pet.getStatus())
                .description(pet.getDescription())
                .imageUrl(pet.getImageUrl())
                .createdAt(pet.getCreatedAt())
                .updatedAt(pet.getUpdatedAt())
                .build();
    }

    private Pet toEntity(PetDTO dto) {
        return Pet.builder()
                .id(dto.getId())
                .name(dto.getName())
                .species(dto.getSpecies())
                .breed(dto.getBreed())
                .ageMonths(dto.getAgeMonths())
                .price(dto.getPrice())
                .status(dto.getStatus())
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .build();
    }
}
