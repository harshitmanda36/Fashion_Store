package com.example.fashion;

import com.example.fashion.model.Product;
import com.example.fashion.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.Arrays;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner init(ProductRepository repo) {
        return args -> {
            if (repo.count() > 0) return;

            Product p1 = new Product("Silk Midi Dress","Elegant silk midi dress perfect for parties and evening events.","Dresses","https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=800&auto=format&fit=crop",new BigDecimal("129.99"),4.6);
            p1.getSizes().addAll(Arrays.asList("XS","S","M","L"));
            p1.getColors().addAll(Arrays.asList("Red","Black","Emerald"));

            Product p2 = new Product("Oversized Cotton Tee","Soft, breathable oversized tee for everyday comfort.","Tops","https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=800&auto=format&fit=crop",new BigDecimal("24.99"),4.4);
            p2.getSizes().addAll(Arrays.asList("S","M","L","XL"));
            p2.getColors().addAll(Arrays.asList("White","Black","Beige"));

            Product p3 = new Product("High-Waisted Jeans","Classic high-waisted straight-leg denim.","Bottoms","https://images.unsplash.com/photo-1520970531071-dc2ae03ac58b?q=80&w=800&auto=format&fit=crop",new BigDecimal("69.99"),4.5);
            p3.getSizes().addAll(Arrays.asList("24","26","28","30","32"));
            p3.getColors().addAll(Arrays.asList("Light Blue","Indigo","Black"));

            Product p4 = new Product("Leather Sneakers","Minimal leather sneakers with cushioned insoles.","Shoes","https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",new BigDecimal("99.00"),4.2);
            p4.getSizes().addAll(Arrays.asList("6","7","8","9","10"));
            p4.getColors().addAll(Arrays.asList("White","Black"));

            Product p5 = new Product("Linen Blazer","Lightweight linen blazer for a tailored summer look.","Outerwear","https://images.unsplash.com/photo-1516827001710-7a3d61f10e62?q=80&w=800&auto=format&fit=crop",new BigDecimal("149.00"),4.8);
            p5.getSizes().addAll(Arrays.asList("S","M","L"));
            p5.getColors().addAll(Arrays.asList("Beige","Navy"));

            Product p6 = new Product("Satin Slip Dress","Flattering satin slip dress with adjustable straps.","Dresses","https://images.unsplash.com/photo-1520975590110-4e30f0f1fe2e?q=80&w=800&auto=format&fit=crop",new BigDecimal("109.50"),4.3);
            p6.getSizes().addAll(Arrays.asList("XS","S","M","L"));
            p6.getColors().addAll(Arrays.asList("Champagne","Black","Forest"));

            Product p7 = new Product("Chunky Hoop Earrings","Gold-toned chunky hoops to elevate any outfit.","Accessories","https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=800&auto=format&fit=crop",new BigDecimal("19.99"),4.1);
            p7.getSizes().addAll(Arrays.asList("One Size"));
            p7.getColors().addAll(Arrays.asList("Gold"));

            Product p8 = new Product("Classic Trench Coat","Water-resistant trench with removable belt.","Outerwear","https://images.unsplash.com/photo-1610030469977-1a1fc5ac0a1c?q=80&w=800&auto=format&fit=crop",new BigDecimal("189.00"),4.9);
            p8.getSizes().addAll(Arrays.asList("S","M","L","XL"));
            p8.getColors().addAll(Arrays.asList("Khaki","Black"));

            Product p9 = new Product("Knitted Cardigan","Cozy ribbed knit cardigan with tonal buttons.","Tops","https://images.unsplash.com/photo-1543339482-37fc1198ec65?q=80&w=800&auto=format&fit=crop",new BigDecimal("59.95"),4.0);
            p9.getSizes().addAll(Arrays.asList("S","M","L"));
            p9.getColors().addAll(Arrays.asList("Cream","Gray"));

            Product p10 = new Product("Pleated Midi Skirt","Flowy pleated skirt that pairs with everything.","Bottoms","https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=800&auto=format&fit=crop",new BigDecimal("54.90"),4.3);
            p10.getSizes().addAll(Arrays.asList("XS","S","M","L"));
            p10.getColors().addAll(Arrays.asList("Blush","Navy"));

            repo.saveAll(java.util.Arrays.asList(p1,p2,p3,p4,p5,p6,p7,p8,p9,p10));
        };
    }
}
