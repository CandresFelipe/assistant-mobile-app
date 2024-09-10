#!/bin/bash

echo "Gathering you ip for dev container..."

##############################################################################################
# en (Ethernet) - ib (InfiniBand) - sl (Serial line IP (slip)) - wl (Wireless local area 
# network (WLAN) - ww (Wireless wide area network (WWAN))
#############################################################################################
#!/bin/bash

# Function to gather IP for Unix-like systems
gather_ip_unix() {
    interface_name="en0"  # Default interface name for macOS; adjust as needed
    ip=$(ifconfig $interface_name | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | sed 's/inet //g')
    echo "REACT_NATIVE_PACKAGER_HOSTNAME=$ip" > .devcontainer/.env
}

# Function to gather IP for Windows systems
gather_ip_windows() {
    # PowerShell command for gathering IP
    powershell -Command "
    $interfaceName = 'Ethernet'  # Replace with your actual network interface name
    $ip = (Get-NetIPAddress -InterfaceAlias $interfaceName -AddressFamily IPv4 | Where-Object { $_.IPAddress -ne '127.0.0.1' }).IPAddress
    if (-not $ip) {
        Write-Error 'Error: Unable to retrieve IP address for interface $interfaceName'
        exit 1
    }
    'REACT_NATIVE_PACKAGER_HOSTNAME=$ip' | Out-File -FilePath .devcontainer/.env -Encoding utf8
    "
}

# Check the OS and run the appropriate function
if [[ "$OSTYPE" == "darwin"* ]]; then
    gather_ip_unix
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    gather_ip_unix
elif [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "msys" ]]; then
    gather_ip_windows
else
    echo "Unsupported OS: $OSTYPE"
    exit 1
fi

echo "IP gathering complete"

generate_base_url_env() {
    port=8000
    if [[ $ip ]]; then
        base_url="EXPO_PUBLIC_API_URL=http://$ip:$port"
        echo $base_url >> .devcontainer/.env
        echo "BASE_URL generated successfully."
    else 
        echo "Error: IP not found. BASE_URL not generated"
        exit 1
    fi

}


echo "Overrides server URL to .env"

generate_base_url_env
    
