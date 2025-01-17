export function LinuxProxySetup() {
    const steps = [
        {
            title: "Open Network Settings",
            description: "Go to 'Settings' > 'Network' in your desktop environment (e.g., GNOME or KDE)."
        },
        {
            title: "Navigate to Proxy Settings",
            description: "Find the 'Proxy' section in the network settings menu."
        },
        {
            title: "Enable Manual Proxy",
            description: "Select 'Manual' as the proxy configuration method."
        },
        {
            title: "Enter Proxy Details",
            description: "Input the proxy server's address and port as provided in Proxy -> Credentials. If BASIC authentication is required, use the provided username and password."
        },
        {
            title: "Apply the Settings",
            description: "Save or apply the changes to enable the proxy configuration."
        },
        {
            title: "Verify the Proxy",
            description: "Open a browser or terminal and test the proxy by visiting an IP-checking website or running `curl ifconfig.me`."
        }
    ];

    return (
        <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">System Proxy Setup on Linux</h1>
            <p className="text-gray-300 mb-6">
                Follow these steps to configure a system-wide proxy on Linux:
            </p>
            <ol className="list-decimal pl-6 space-y-4">
                {steps.map((step, index) => (
                    <li key={index} className="text-gray-400">
                        <h2 className="text-lg font-semibold text-green-500">{step.title}</h2>
                        <p className="text-gray-300">{step.description}</p>
                    </li>
                ))}
            </ol>
            <div className="mt-6">
                <p className="text-gray-400">
                    Need more help? Visit our <a href="#" className="text-green-500 underline">support page</a> or contact us directly.
                </p>
            </div>
        </div>
    );
}
