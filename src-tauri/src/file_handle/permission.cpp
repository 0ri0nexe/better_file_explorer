#include <iostream>
#include <cstring>
#include <windows.h>
#include <filesystem>

extern "C"
{
    int isProtected(const uint8_t *pathBytes, int lenght)
    {
        bool is_protected = false;

        std::string path(reinterpret_cast<const char *>(pathBytes), lenght);
        DWORD attributs = GetFileAttributesA(path.c_str());

        if (attributs != INVALID_FILE_ATTRIBUTES)
        {
            if (attributs & FILE_ATTRIBUTE_SYSTEM)
            {
                is_protected = true;
            }
        }
        else
        {
            is_protected = true;
        }

        try
        {
            std::filesystem::directory_entry entry(path);

            if (entry.exists())
            {
                if (!entry.is_regular_file() && !entry.is_directory())
                {
                    is_protected = true;
                }
            }
            else
            {
                is_protected = true;
            }
        }
        catch (...)
        {
            is_protected = true;
        }
        return is_protected;
    }
}