
@RestController
@RequestMapping("/ratings")



public class RatingsController {
    @Autowired
    private RatingsService ratingsService;

    @GetMapping
    public ResponseEntity<List<Ratings>> getAllRatings() {
        List<Ratings> ratings = ratingsService.getAllRatings();
        return new ResponseEntity<>(ratings, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ratings> getRatingsById(@PathVariable("id") long id) {
        Ratings ratings = ratingsService.getRatingsById(id);
        if (ratings != null) {
            return new ResponseEntity<>(ratings, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Ratings> addRating(@RequestBody Ratings ratings) {
        Ratings addedRatings = ratingsService.addRating(ratings);
        return new ResponseEntity<>(addedRatings, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ratings> updateRatings(@PathVariable("id") long id, @RequestBody Ratings newRatings) {
        Ratings updatedRatings = ratingsService.updateRating(id, newRatings);
        if (updatedRatings != null) {
            return new ResponseEntity<>(updatedRatings, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRatings(@PathVariable("id") long id) {
        ratingsService.deleteRatings(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}
