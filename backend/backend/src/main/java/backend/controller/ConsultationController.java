package backend.controller;

import org.springframework.web.bind.annotation.*;
import backend.model.ConsultationRequest;

@RestController
@CrossOrigin("http://localhost:3000")
public class ConsultationController {

    @PostMapping("/consult")
    public RecommendationResponse getRecommendation(@RequestBody ConsultationRequest request) {
        String skinType = request.getSkinType().trim().toLowerCase();
        String issue = request.getIssue().trim().toLowerCase();
        String routine = request.getRoutine().trim().toLowerCase();
        String recommendation;

        if (skinType.equals("oily") && issue.equals("acne")) {
            recommendation = oilyAcneRoutine();
        } else if (skinType.equals("dry") && issue.equals("wrinkles")) {
            recommendation = dryWrinklesRoutine();
        } else if (skinType.equals("sensitive")) {
            recommendation = sensitiveRoutine();
        } else if (skinType.equals("combination")) {
            recommendation = combinationRoutine();
        } else {
            recommendation = defaultRoutine();
        }

        return new RecommendationResponse(recommendation);
    }

    private String oilyAcneRoutine() {
        return """
                🧴 Morning Routine:
                Cleanser:
                Gentle foaming cleanser (Salicylic Acid-based)
                Example: CeraVe Foaming Cleanser / La Roche-Posay Effaclar Purifying Gel

                Toner (optional but helpful):
                Oil-controlling toner with mild exfoliation
                Example: Paula’s Choice Pore-Reducing Toner

                Serum:
                Niacinamide (5-10%) – helps control oil and fade acne marks
                Example: The Ordinary Niacinamide 10% + Zinc 1%

                Moisturizer:
                Oil-free, non-comedogenic, lightweight gel moisturizer
                Example: Neutrogena Hydro Boost Water Gel

                Sunscreen (MUST):
                Oil-free, matte-finish sunscreen
                Example: La Roche-Posay Anthelios / Neutrogena Ultra Sheer Dry-Touch SPF 50

                🌙 Night Routine:
                Cleanser: (Same as morning)

                Toner: (Optional, same as morning)

                Treatment Serum:
                Alternate nights:
                ▸ Salicylic Acid serum (for active acne)
                ▸ Retinol (0.1% to 0.5% to start – helps prevent breakouts and fade scars)
                Example: The Ordinary Salicylic Acid 2% Solution, La Roche-Posay Retinol B3 Serum

                Moisturizer: (Same as morning or a slightly richer non-comedogenic one)

                ✅ Important Tips:
                ▸ Avoid over-washing (2x a day is enough)
                ▸ Don’t skip moisturizer (it helps balance oil)
                ▸ Use non-comedogenic (won't clog pores) makeup/products
                ▸ Consistency is key (results in 6-8 weeks)
                ▸ Consider seeing a dermatologist if acne is moderate to severe
                """;
    }

    private String dryWrinklesRoutine() {
        return """
                🧴 Morning Routine:
                Cleanser:
                Hydrating, non-foaming cleanser
                Example: CeraVe Hydrating Cleanser

                Serum:
                Hyaluronic acid-based serum for deep hydration
                Example: The Ordinary Hyaluronic Acid 2% + B5

                Moisturizer:
                Rich, ceramide-based moisturizer
                Example: CeraVe Moisturizing Cream

                Sunscreen (MUST):
                Hydrating sunscreen with SPF 50
                Example: Neutrogena Hydro Boost Sunscreen SPF 50

                🌙 Night Routine:
                Cleanser: (Same as morning)

                Serum:
                Retinol (0.3% to 0.5% for anti-aging)
                Example: La Roche-Posay Retinol B3 Serum

                Moisturizer:
                Rich moisturizer or overnight hydrating mask

                ✅ Important Tips:
                ▸ Use gentle products to avoid over-drying
                ▸ Always moisturize after cleansing
                ▸ Be consistent for best results
                """;
    }

    private String sensitiveRoutine() {
        return """
                🧴 Morning Routine:
                Cleanser:
                Very gentle, fragrance-free cleanser
                Example: Cetaphil Gentle Skin Cleanser

                Serum:
                Calming serum with Centella Asiatica or Aloe Vera

                Moisturizer:
                Hypoallergenic, fragrance-free moisturizer
                Example: Vanicream Moisturizing Cream

                Sunscreen (MUST):
                Mineral-based sunscreen (Zinc Oxide / Titanium Dioxide)
                Example: Neutrogena Sheer Zinc Face Dry-Touch SPF 50

                🌙 Night Routine:
                Cleanser: (Same as morning)

                Serum:
                Use only calming serum (avoid actives like retinol or acids)

                Moisturizer:
                (Same as morning)

                ✅ Important Tips:
                ▸ Always patch test new products
                ▸ Avoid products with alcohol or strong fragrance
                ▸ Consult a dermatologist for severe sensitivity
                """;
    }

    private String combinationRoutine() {
        return """
                🧴 Morning Routine:
                Cleanser:
                Balancing gel cleanser
                Example: La Roche-Posay Toleriane Purifying Foaming Cleanser

                Toner:
                Hydrating but lightweight toner

                Serum:
                Niacinamide (balances oil and hydrates)

                Moisturizer:
                Lightweight gel moisturizer for T-zone, cream for dry areas

                Sunscreen (MUST):
                Lightweight sunscreen
                Example: Neutrogena Ultra Sheer SPF 50

                🌙 Night Routine:
                Cleanser: (Same as morning)

                Serum:
                Alternate Niacinamide and gentle retinol

                Moisturizer:
                Same as morning

                ✅ Important Tips:
                ▸ Balance products: oil control in T-zone, hydration for cheeks
                ▸ Avoid overuse of drying ingredients
                ▸ Be consistent with morning and night care
                """;
    }

    private String defaultRoutine() {
        return """
                🧴 Basic Skincare Routine:
                ▸ Cleanser: Gentle daily cleanser
                ▸ Moisturizer: Suitable for your skin type
                ▸ Sunscreen: SPF 30 or higher

                ✅ Tips:
                ▸ Stay consistent
                ▸ Introduce new products gradually
                ▸ For complex issues, consult a dermatologist
                """;
    }
}
