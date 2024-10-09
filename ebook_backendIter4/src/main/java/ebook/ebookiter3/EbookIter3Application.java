package ebook.ebookiter3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class EbookIter3Application {
    public static void main(String[] args) {
        SpringApplication.run(EbookIter3Application.class, args);
    }

}
