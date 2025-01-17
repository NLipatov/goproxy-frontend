export function WindowsProxySetup() {
    const steps = [
        {
            title: "Open Proxy Settings",
            description: "Press `Win + I` to open Settings, then navigate to 'Network & Internet' > 'Proxy'."
        },
        {
            title: "Enable Manual Proxy Setup",
            description: "Scroll down to the 'Manual proxy setup' section and toggle the switch to 'On'."
        },
        {
            title: "Enter Proxy Details",
            description: "Fill in the 'Address' and 'Port' fields with the details provided in Proxy -> Credentials. If BASIC authentication is required, use the provided username and password."
        },
        {
            title: "Save the Configuration",
            description: "Click 'Save' to apply the proxy settings."
        },
        {
            title: "Test the Connection",
            description: "Open a browser and ensure the proxy is working correctly. You can visit any IP-checking website to verify."
        }
    ];

    return (
        <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">System Proxy Setup on Windows</h1>
            <p className="text-gray-300 mb-6">
                Follow these steps to configure a system-wide proxy on Windows:
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
