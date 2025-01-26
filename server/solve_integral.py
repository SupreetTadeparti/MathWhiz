from manim import *

class ExponentialIntegrationExample(Scene):
    def construct(self):
        # Displaying the problem
        problem = MathTex(r"\int e^{2x} \,dx")
        self.play(Write(problem))
        self.wait(1)

        # Explanation for using the power rule
        explanation1 = Text("Use the power rule for exponentials", font_size=24).to_edge(UP)
        self.play(Write(explanation1))
        self.wait(2)

        # Integration step
        integration_step = MathTex(r"\int e^{2x} \,dx = \frac{1}{2}e^{2x} + C")
        self.play(ReplacementTransform(problem, integration_step))
        self.wait(2)

        # Clear the scene
        self.play(FadeOut(explanation1), FadeOut(integration_step))
        self.wait(1)

        # Conclude with the final solution
        final_solution = MathTex(r"\frac{1}{2}e^{2x} + C")
        self.play(Write(final_solution))
        self.wait(1)