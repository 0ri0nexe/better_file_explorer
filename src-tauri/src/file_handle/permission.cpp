#include <iostream>
#include <cstring>
#include <filesystem>

extern "C"
{
    int isProtected(const uint8_t *pathBytes, int lenght)
    {
        std::string path(reinterpret_cast<const char *>(pathBytes), lenght);
        try
        {
            std::filesystem::directory_entry entry(path);

            if (entry.exists())
            {
                if (entry.is_regular_file())
                {
                    return 0;
                }
                else if (entry.is_directory())
                {
                    return 0;
                }
            }
            else
            {
                return 1;
            }
        }
        catch (...)
        {
            return 1;
        }
        return 1;
    }
}