using System;
using System.Collections.Generic;
using System.IO;

namespace FingergunsApi.Infrastructure.Config
{
    public static class EnvFileLoader
    {
        public static void Load(string filepath)
        {
            if (!File.Exists(filepath))
                throw new ArgumentException($"Failed to load env file from filepath {filepath}", nameof(filepath));

            var keyValuePairs = GetKeyValuePairs(filepath);
            SetEnvironmentVariables(keyValuePairs);
        }

        private static List<KeyValuePair<string, string>> GetKeyValuePairs(string filepath)
        {
            var keyValuePairs = new List<KeyValuePair<string, string>>();

            foreach (var line in File.ReadLines(filepath))
            {
                var parts = line.Split('=');

                if (parts.Length != 2)
                    throw new Exception($"Ambiguous key value pair in env file, line '{line}'");

                keyValuePairs.Add(new(parts[0], parts[1]));
            }

            return keyValuePairs;
        }

        private static void SetEnvironmentVariables(IList<KeyValuePair<string, string>> keyValuePairs)
        {
            foreach (var kvp in keyValuePairs)
            {
                Environment.SetEnvironmentVariable(kvp.Key, kvp.Value);
            }
        }
    }
}
