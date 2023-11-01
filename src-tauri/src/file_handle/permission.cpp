#include <iostream>
#include <cstring>
#include <filesystem>

extern "C"
{
    int isProtected(const uint8_t *pathBytes, int lenght)
    {
        std::cout << "call" << std::endl;
        std::string path(reinterpret_cast<const char *>(pathBytes), lenght);
        std::filesystem::directory_entry entry(path);
        std::cout << "received " << path << std::endl;

        if (entry.exists())
        {
            if (entry.is_regular_file())
            {
                std::cout << "regular_file" << std::endl;
                return 0;
            }
            else if (entry.is_directory())
            {
                std::cout << "regular_directory" << std::endl;

                return 0;
            }
        }
        else
        {
            return 1;
        }

        return 1;
    }
}