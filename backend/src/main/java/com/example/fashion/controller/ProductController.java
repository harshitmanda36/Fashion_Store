package com.example.fashion.controller;

import com.example.fashion.model.Product;
import com.example.fashion.repository.ProductRepository;
import com.example.fashion.service.ProductService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api")
public class ProductController {

    public static class ProductRequest {
        @NotBlank public String name;
        public String description;
        @NotBlank public String category;
        @NotBlank public String imageUrl;
        @NotNull public BigDecimal price;
        public double rating = 0.0;
        public List<String> sizes = List.of();
        public List<String> colors = List.of();
    }

    private final ProductService productService;
    private final ProductRepository productRepository;

    public ProductController(ProductService productService, ProductRepository productRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @GetMapping("/products")
    public Map<String, Object> getProducts(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) String size,
            @RequestParam(required = false, defaultValue = "relevance") String sort,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "12") int sizePerPage
    ) {
        Pageable pageable = PageRequest.of(page, sizePerPage);
        Page<Product> pageData = productService.search(q, category, minPrice, maxPrice, color, size, sort, pageable);

        Map<String, Object> resp = new HashMap<>();
        resp.put("items", pageData.getContent());
        resp.put("page", pageData.getNumber());
        resp.put("size", pageData.getSize());
        resp.put("total", pageData.getTotalElements());
        return resp;
    }

    @PostMapping("/products")
    @PreAuthorize("hasRole('ADMIN')")
    public Product createProduct(@RequestBody @Valid ProductRequest req) {
        Product p = new Product(req.name, req.description, req.category, req.imageUrl, req.price, req.rating);
        p.setSizes(new ArrayList<>(req.sizes));
        p.setColors(new ArrayList<>(req.colors));
        return productRepository.save(p);
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return productService.categories();
    }
}
