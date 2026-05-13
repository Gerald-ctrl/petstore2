package com.petstore.config;
import com.petstore.model.Pet;
import com.petstore.model.PetStatus;
import com.petstore.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final PetRepository petRepository;

    @Override
    public void run(String... args) {
        if (petRepository.count() > 0) {
            log.info("Database already contains data, skipping seeding.");
            return;
        }

        log.info("Seeding initial pet data...");

        List<Pet> pets = List.of(
            Pet.builder()
                .name("Buddy")
                .species("Dog")
                .breed("Golden Retriever")
                .ageMonths(24)
                .price(new BigDecimal("1200.00"))
                .status(PetStatus.AVAILABLE)
                .description("Friendly and energetic Golden Retriever, loves children and outdoor activities.")
                .imageUrl("https://images.unsplash.com/photo-1552053831-71594a27632d?w=600")
                .build(),
            Pet.builder()
                .name("Luna")
                .species("Cat")
                .breed("Siamese")
                .ageMonths(12)
                .price(new BigDecimal("800.00"))
                .status(PetStatus.AVAILABLE)
                .description("Beautiful Siamese cat with striking blue eyes. Very affectionate and vocal.")
                .imageUrl("https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600")
                .build(),
            Pet.builder()
                .name("Charlie")
                .species("Dog")
                .breed("Beagle")
                .ageMonths(36)
                .price(new BigDecimal("950.00"))
                .status(PetStatus.AVAILABLE)
                .description("Active Beagle with a great sense of smell. Perfect for an active family.")
                .imageUrl("https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600")
                .build(),
            Pet.builder()
                .name("Oliver")
                .species("Cat")
                .breed("Maine Coon")
                .ageMonths(18)
                .price(new BigDecimal("1500.00"))
                .status(PetStatus.PENDING)
                .description("Large and gentle Maine Coon. Known for his fluffy coat and friendly nature.")
                .imageUrl("https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600")
                .build(),
            Pet.builder()
                .name("Goldie")
                .species("Fish")
                .breed("Goldfish")
                .ageMonths(6)
                .price(new BigDecimal("15.00"))
                .status(PetStatus.AVAILABLE)
                .description("Classic orange goldfish. Easy to care for and perfect for beginners.")
                .imageUrl("https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600")
                .build(),
            Pet.builder()
                .name("Bluey")
                .species("Bird")
                .breed("Budgie")
                .ageMonths(10)
                .price(new BigDecimal("45.00"))
                .status(PetStatus.AVAILABLE)
                .description("Vibrant blue budgie, loves to chirp and interact with people.")
                .imageUrl("https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=600")
                .build(),
            Pet.builder()
                .name("Snowy")
                .species("Rabbit")
                .breed("Holland Lop")
                .ageMonths(8)
                .price(new BigDecimal("120.00"))
                .status(PetStatus.AVAILABLE)
                .description("Adorable white rabbit with floppy ears. Very soft and gentle.")
                .imageUrl("https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600")
                .build(),
            Pet.builder()
                .name("Max")
                .species("Dog")
                .breed("German Shepherd")
                .ageMonths(48)
                .price(new BigDecimal("1800.00"))
                .status(PetStatus.SOLD)
                .description("Loyal and intelligent German Shepherd. Highly trained and protective.")
                .imageUrl("https://images.unsplash.com/photo-1589944172325-1681255ec38e?w=600")
                .build()
        );

        petRepository.saveAll(pets);
        log.info("Successfully seeded {} pets.", pets.size());
    }
}
