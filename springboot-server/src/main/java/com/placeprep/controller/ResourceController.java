package com.placeprep.controller;

import com.placeprep.dto.ApiResponse;
import com.placeprep.model.Resource;
import com.placeprep.service.ResourceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Resources REST Controller.
 * Direct equivalent of Node.js resourceRoutes.js:
 * - router.get('/', protect, getResources) -> @GetMapping
 */
@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    /**
     * Equivalent to: router.get('/', protect, getResources)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Resource>>> getResources(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String type) {
        List<Resource> resources = resourceService.getResources(category, type);
        return ResponseEntity.ok(ApiResponse.success(resources));
    }
}
