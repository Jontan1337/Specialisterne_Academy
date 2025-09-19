namespace Kod_En_Lommeregner
{
    public enum ReadType
    {
        ReadLine,
        ReadKey
    }

    public class MenuBuilder
    {
        private Dictionary<string, string> menuItems = new Dictionary<string, string>();
        private ReadType readType;
        private char keyValueSeparator;

        // TODO: Add options to menu as string
        // TODO: Set wether menu should use readline or readkey

        public MenuBuilder(ReadType readType, char keyValueSeparator)
        {
            this.readType = readType;
            this.keyValueSeparator = keyValueSeparator;
        }

        public Dictionary<string, string> MenuItems {
            get => menuItems;
            private set => menuItems = value;
        }

        public void AddOption(string key, string text)
        {
            menuItems.Add(key, text);
        }

        public void AddOption(ConsoleKeyInfo keyInfo, string text)
        {
            menuItems.Add(keyInfo.Key.ToString(), text);
        }

        public void Display(bool clear = true)
        {
            if (clear)
                Console.Clear();

            foreach (var item in menuItems)
            {
                Console.WriteLine($"{item.Key}{keyValueSeparator} {item.Value}");
            }
        }

        public int Selection()
        {
            string inputValue = "";
            switch (readType)
            {
                case ReadType.ReadLine:
                    inputValue = Console.ReadLine();
                    break;
                case ReadType.ReadKey:
                    inputValue = Console.ReadKey().KeyChar.ToString();
                    break;
                default:
                    break;
            }

            var e = menuItems.FirstOrDefault(i => i.Key == inputValue);
            if (e.Equals(default))
            {
                Console.WriteLine("Oopsie");
                return -1;
            }

            return menuItems.Keys.ToList().IndexOf(e.Key);
        }
    }
}
