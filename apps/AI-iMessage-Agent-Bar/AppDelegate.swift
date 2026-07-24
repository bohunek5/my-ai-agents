import AppKit

final class AppDelegate: NSObject, NSApplicationDelegate {
    private let statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)
    private let controlScript = "/Users/karolbohdanowicz/my-ai-agents/tools/toggle_imessage_ai_agent.sh"
    private let logPath = "\(NSHomeDirectory())/Library/Application Support/iMessageAIAgent/agent.log"
    private var timer: Timer?
    private var isOn = false

    func applicationDidFinishLaunching(_ notification: Notification) {
        if let button = statusItem.button {
            button.imagePosition = .imageOnly
            button.toolTip = "AI iMessage Agent"
        }

        statusItem.menu = buildMenu()
        refreshStatus()
        timer = Timer.scheduledTimer(withTimeInterval: 2.0, repeats: true) { [weak self] _ in
            self?.refreshStatus()
        }
    }

    private func buildMenu() -> NSMenu {
        let menu = NSMenu()
        let stateItem = NSMenuItem(title: "Status: sprawdzam...", action: nil, keyEquivalent: "")
        stateItem.tag = 100
        menu.addItem(stateItem)
        menu.addItem(NSMenuItem.separator())
        menu.addItem(NSMenuItem(title: "Przelacz ON/OFF", action: #selector(toggleAgent), keyEquivalent: ""))
        menu.addItem(NSMenuItem(title: "Wlacz AI", action: #selector(turnOn), keyEquivalent: ""))
        menu.addItem(NSMenuItem(title: "Wylacz AI", action: #selector(turnOff), keyEquivalent: ""))
        menu.addItem(NSMenuItem.separator())
        menu.addItem(NSMenuItem(title: "Pokaz log", action: #selector(showLog), keyEquivalent: ""))
        menu.addItem(NSMenuItem(title: "Otworz folder aplikacji", action: #selector(openFolder), keyEquivalent: ""))
        menu.addItem(NSMenuItem.separator())
        menu.addItem(NSMenuItem(title: "Zamknij ikonke", action: #selector(quit), keyEquivalent: "q"))
        return menu
    }

    private func refreshStatus() {
        let output = runControl(["status"]).trimmingCharacters(in: .whitespacesAndNewlines)
        isOn = output == "on"
        statusItem.button?.image = makeDotImage(on: isOn)
        if let stateItem = statusItem.menu?.item(withTag: 100) {
            stateItem.title = isOn ? "Status: wlaczony" : "Status: wylaczony"
        }
    }

    @objc private func toggleAgent() {
        _ = runControl(["toggle"])
        refreshStatus()
    }

    @objc private func turnOn() {
        _ = runControl(["on"])
        refreshStatus()
    }

    @objc private func turnOff() {
        _ = runControl(["off"])
        refreshStatus()
    }

    @objc private func showLog() {
        NSWorkspace.shared.open(URL(fileURLWithPath: logPath))
    }

    @objc private func openFolder() {
        NSWorkspace.shared.open(URL(fileURLWithPath: "/Users/karolbohdanowicz/my-ai-agents"))
    }

    @objc private func quit() {
        NSApplication.shared.terminate(nil)
    }

    private func runControl(_ arguments: [String]) -> String {
        let process = Process()
        process.executableURL = URL(fileURLWithPath: "/bin/bash")
        process.arguments = [controlScript] + arguments

        let pipe = Pipe()
        process.standardOutput = pipe
        process.standardError = pipe

        do {
            try process.run()
            process.waitUntilExit()
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            return String(data: data, encoding: .utf8) ?? ""
        } catch {
            return ""
        }
    }

    private func makeDotImage(on: Bool) -> NSImage {
        let size = NSSize(width: 18, height: 18)
        let image = NSImage(size: size)
        image.lockFocus()

        NSColor.clear.setFill()
        NSRect(origin: .zero, size: size).fill()

        let dotRect = NSRect(x: 3, y: 3, width: 12, height: 12)
        let color = on ? NSColor.systemGreen : NSColor.systemRed
        let shadow = NSShadow()
        shadow.shadowBlurRadius = 2
        shadow.shadowOffset = NSSize(width: 0, height: -0.5)
        shadow.shadowColor = color.withAlphaComponent(0.45)
        shadow.set()

        color.setFill()
        NSBezierPath(ovalIn: dotRect).fill()

        NSColor.white.withAlphaComponent(0.7).setStroke()
        let stroke = NSBezierPath(ovalIn: dotRect.insetBy(dx: 0.7, dy: 0.7))
        stroke.lineWidth = 1
        stroke.stroke()

        image.unlockFocus()
        image.isTemplate = false
        return image
    }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.accessory)
app.run()
