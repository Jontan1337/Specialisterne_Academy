using Kod_En_Lommeregner;

public class Program
{
    private static void Main(string[] args)
    {
        bool running = true;

        MenuBuilder mainMenu = new MenuBuilder(ReadType.ReadKey, '.');
        mainMenu.AddOption("1", "Addition");
        mainMenu.AddOption("2", "Subtraktion");
        mainMenu.AddOption("3", "Multiplikation");
        mainMenu.AddOption("4", "Division");
        mainMenu.AddOption("5", "Kvadratrod");
        mainMenu.AddOption("6", "Potens");
        mainMenu.AddOption("q", "Afslut");

        while (running)
        {
            MathOperation operationChoice = MathOperation.Addition;
            bool valid = false;

            while (!valid)
            {
                Console.WriteLine("Vælg:");
                mainMenu.Display();
                int selection = mainMenu.Selection();

                try
                {
                    // Assuming last item in menu is "quit"
                    if (selection == mainMenu.MenuItems.Count-1)
                    {
                        running = false;
                        break;
                    }

                    if (selection != -1)
                    {
                        operationChoice = (MathOperation)Convert.ToInt32(selection+1);
                        valid = true;
                    }
                }
                catch (Exception e)
                {
                    Console.Clear();
                }
            }

            if (!running)
                break;

            valid = false;
            double result1 = 0;
            while (!valid)
            {
                Console.Write("Første tal: ");

                if (ReadDouble(out result1))
                {
                    valid = true;
                }
                else
                {
                    Console.WriteLine($"Du skal skrive et tal.\nPrøv igen.");
                }

                if (!CanDivide(operationChoice, result1))
                {
                    Console.WriteLine("Det får du altså ikke lov til.");
                    valid = false;
                }
            }

            valid = false;
            double result2 = 0;
            while (!valid)
            {
                Console.Write("Andet tal:");

                if (ReadDouble(out result2))
                {
                    valid = true;
                }
                else
                {
                    Console.WriteLine($"Du skal skrive et tal.\nPrøv igen.");
                }

                if (!CanDivide(operationChoice, result2))
                {
                    Console.WriteLine("Det får du altså ikke lov til.");
                    valid = false;
                }
            }

            double operationResult = 0;
            switch (operationChoice)
            {
                case MathOperation.Addition:
                    operationResult = Add(result1, result2);
                    break;
                case MathOperation.Subtraction:
                    operationResult = Subtract(result1, result2);
                    break;
                case MathOperation.Multiplication:
                    operationResult = Multiply(result1, result2);
                    break;
                case MathOperation.Division:
                    operationResult = Divide(result1, result2);
                    break;
                case MathOperation.Squareroot:
                    operationResult = SquareRoot(result1, result2);
                    break;
                case MathOperation.Pow:
                    operationResult = Pow(result1, result2);
                    break;
                default:
                    break;
            }

            Console.WriteLine($"Resultat: {operationResult}");
            Console.ReadLine();
            Console.Clear();
        }
    }

    private static bool CanDivide(MathOperation operationChoice, double result)
    {
        return result != 0 && operationChoice == MathOperation.Division;
    }

    private static bool ReadDouble(out double result)
    {
        string? input = Console.ReadLine();

        return double.TryParse(input, default, out result);
    }

    private static double Add(double a, double b)
    {
        return a + b;
    }

    private static double Subtract(double a, double b)
    {
        return a - b;
    }

    private static double Multiply(double a, double b)
    {
        return a * b;
    }

    private static double Divide(double a, double b)
    {
        return a / b;
    }

    private static double SquareRoot(double a, double b)
    {
        return Math.Sqrt(a + b);
    }

    private static double Pow(double a, double b)
    {
        return Math.Pow(a, b);
    }
}