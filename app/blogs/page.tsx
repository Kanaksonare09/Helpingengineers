"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Calendar, Clock, User, Search, Heart, Share2, ArrowRight, Tag } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Electronics Components Every Maker Needs",
    excerpt: "From Arduino boards to sensors, discover the essential components that will kickstart your electronics journey.",
    fullContent: `Starting with electronics can be overwhelming with so many components available. Here are the top 10 essential components every maker should have:

1. **Arduino UNO** - The perfect microcontroller board for beginners. Easy to program and has a huge community support.

2. **Breadboard** - Build circuits without soldering. Essential for prototyping and testing your ideas quickly.

3. **Jumper Wires** - Connect components on your breadboard. Get both male-to-male and male-to-female wires.

4. **Resistors** - Control current flow in circuits. Start with a variety pack from 220Ω to 10kΩ.

5. **LEDs** - Visual feedback for your projects. Red, green, and blue LEDs are must-haves.

6. **Push Buttons** - Add interactivity to projects. Simple tactile switches work great.

7. **DHT11 Sensor** - Measure temperature and humidity. Perfect for weather station projects.

8. **HC-SR04 Ultrasonic Sensor** - Measure distance accurately. Great for robotics and obstacle avoidance.

9. **Servo Motor** - Add movement to projects. Control angles precisely for robotic arms.

10. **Power Supply** - Reliable power is crucial. Get a 5V/12V adapter and battery packs.

With these components, you can build hundreds of different projects! Start with simple LED blinking and progress to complex IoT systems.`,
    category: "Electronics",
    author: "Rajesh Kumar",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    image: "/image 1.jpg",
    featured: true,
    likes: 234,
  },
  {
    id: 2,
    title: "IoT Projects with ESP32: A Complete Beginner's Guide",
    excerpt: "Learn how to build your first IoT project using ESP32. Connect sensors, control devices remotely, and create smart home solutions.",
    fullContent: `The ESP32 is a powerful microcontroller with built-in WiFi and Bluetooth, making it perfect for IoT projects.

**Getting Started:**
- Install Arduino IDE
- Add ESP32 board support
- Connect ESP32 to your computer
- Upload your first WiFi connection sketch

**Project Ideas:**
1. **Smart Temperature Monitor** - Read DHT22 sensor and send data to your phone
2. **WiFi Controlled LED** - Control lights from anywhere in your home
3. **Smart Doorbell** - Get notifications when someone rings the bell
4. **Weather Station** - Display real-time weather data on a webpage

**Key Features:**
- Dual-core processor (240MHz)
- Built-in WiFi and Bluetooth
- Low power consumption
- Multiple GPIO pins
- ADC and DAC support

The ESP32 opens up endless possibilities for IoT projects. Start simple and gradually build more complex systems!`,
    category: "IoT",
    author: "Priya Sharma",
    date: "Jan 8, 2026",
    readTime: "12 min read",
    image: "/image 2.jpg",
    featured: true,
    likes: 189,
  },
  {
    id: 3,
    title: "Arduino vs Raspberry Pi: Which One Should You Choose?",
    excerpt: "A detailed comparison of Arduino and Raspberry Pi platforms to help you decide which board is perfect for your next project.",
    fullContent: `Choosing between Arduino and Raspberry Pi depends on your project requirements.

**Arduino:**
- Best for: Real-time control, simple projects
- Pros: Low power, simple programming, real-time operations
- Cons: Limited processing power, no operating system
- Price: ₹899 (UNO)

**Raspberry Pi:**
- Best for: Complex computing, media projects
- Pros: Full computer, runs Linux, multiple languages
- Cons: Higher power consumption, not real-time
- Price: ₹4999 (Pi 4)

**When to use Arduino:**
- Robotics control
- Sensor reading
- Motor control
- Battery-powered projects

**When to use Raspberry Pi:**
- Media center
- Web server
- AI/ML projects
- Desktop replacement

Many makers use both in combination - Raspberry Pi for brain and Arduino for muscle control!`,
    category: "Comparison",
    author: "Amit Patel",
    date: "Jan 5, 2026",
    readTime: "10 min read",
    image: "/macbook-air-laptop-silver.jpg",
    featured: false,
    likes: 156,
  },
  {
    id: 4,
    title: "Building a Weather Station with Sensors",
    excerpt: "Step-by-step guide to creating your own weather monitoring system with temperature, humidity, and pressure sensors.",
    fullContent: `Create a complete weather station that measures temperature, humidity, pressure, and more!

**Components Needed:**
- Arduino/ESP32
- DHT22 (Temperature & Humidity)
- BMP180 (Pressure)
- Rain sensor
- OLED display
- Enclosure

**Step 1: Hardware Setup**
Connect all sensors to your microcontroller using I2C or digital pins.

**Step 2: Software**
Install necessary libraries and write code to read sensor data.

**Step 3: Display**
Show real-time data on OLED screen or send to smartphone.

**Step 4: Data Logging**
Store readings on SD card or upload to cloud services.

**Advanced Features:**
- Weather forecasting
- Historical data graphs
- Alert notifications
- Solar power option

Build your own weather station and understand climate patterns in your area!`,
    category: "Projects",
    author: "Sneha Reddy",
    date: "Jan 3, 2026",
    readTime: "15 min read",
    image: "/ipad-pro-tablet-with-stylus.jpg",
    featured: false,
    likes: 142,
  },
  {
    id: 5,
    title: "Motor Control with L298N: Robotics Basics",
    excerpt: "Master motor control for robotics projects. Learn to drive DC motors, control speed, and build your first robot chassis.",
    fullContent: `The L298N motor driver is essential for robotics projects.

**Understanding L298N:**
- Dual H-Bridge driver
- Controls 2 DC motors or 1 stepper
- Up to 2A per channel
- 5-35V input voltage

**Wiring:**
1. Connect motor outputs to M1/M2
2. Connect Arduino pins to IN1-IN4
3. Connect power supply (7-12V)
4. Enable speed control with PWM

**Basic Control:**
- Forward: IN1=HIGH, IN2=LOW
- Reverse: IN1=LOW, IN2=HIGH
- Stop: Both LOW
- Speed: PWM on enable pins

**Robot Chassis:**
- Use BO motors (300 RPM)
- Add wheels with rubber tires
- Mount components on acrylic base
- Add sensors for autonomy

Start with basic remote control and progress to autonomous navigation!`,
    category: "Robotics",
    author: "Ananya Desai",
    date: "Dec 30, 2025",
    readTime: "9 min read",
    image: "/airpods-pro-white-wireless-earbuds.jpg",
    featured: false,
    likes: 167,
  },
  {
    id: 6,
    title: "PCB Design Basics: From Schematic to Board",
    excerpt: "Learn PCB design fundamentals using EasyEDA and KiCad. Create professional circuit boards for your projects.",
    fullContent: `Designing your own PCBs takes your projects to the next level!

**Software Options:**
- **EasyEDA** - Browser-based, beginner-friendly
- **KiCad** - Free, powerful, professional
- **Eagle** - Industry standard
- **Altium** - Professional level

**Design Steps:**
1. **Schematic Design** - Draw your circuit diagram
2. **Component Selection** - Choose footprints
3. **Layout Design** - Place and route components
4. **Design Rules Check** - Verify errors
5. **Generate Gerber Files** - For manufacturing

**Best Practices:**
- Keep traces short and direct
- Use ground planes
- Add proper decoupling capacitors
- Consider trace width for current
- Label all components clearly

**Manufacturing:**
- JLCPCB - ₹200 for 5 PCBs
- PCBWay - Fast delivery
- OSH Park - High quality

Start with simple 2-layer boards and gradually learn advanced techniques!`,
    category: "Electronics",
    author: "Karthik Iyer",
    date: "Dec 28, 2025",
    readTime: "14 min read",
    image: "/image 1.jpg",
    featured: false,
    likes: 198,
  },
  {
    id: 7,
    title: "Soldering Guide for Beginners",
    excerpt: "Master the art of soldering with proper techniques, tools, and safety tips for electronics assembly.",
    fullContent: `Soldering is an essential skill for every electronics enthusiast.

**Essential Tools:**
- Soldering iron (40W recommended)
- Solder wire (60/40 or 63/37)
- Soldering stand
- Helping hands
- Wire cutters
- Flux

**Technique:**
1. Clean the tip with wet sponge
2. Heat the joint, not the solder
3. Apply solder to the joint
4. Remove solder, then iron
5. Let it cool naturally

**Common Mistakes:**
- Too much heat - Damages components
- Too little heat - Cold joints
- Too much solder - Bridges
- Moving while cooling - Cracks

**Safety Tips:**
- Work in ventilated area
- Use fume extractor
- Wash hands after soldering
- Keep iron away from cables

**Practice Projects:**
- LED circuits
- Arduino shields
- Audio amplifiers
- Through-hole components first

With practice, you'll create professional-looking solder joints!`,
    category: "Electronics",
    author: "Neha Gupta",
    date: "Dec 25, 2025",
    readTime: "11 min read",
    image: "/image 2.jpg",
    featured: false,
    likes: 223,
  },
  {
    id: 8,
    title: "Home Automation with Raspberry Pi and MQTT",
    excerpt: "Build a complete smart home system using Raspberry Pi, MQTT protocol, and Home Assistant.",
    fullContent: `Create your own smart home without expensive commercial products!

**Components:**
- Raspberry Pi 4 (4GB)
- Relay modules
- ESP8266/ESP32 nodes
- Sensors (PIR, temperature, door)
- MQTT broker (Mosquitto)

**System Architecture:**
1. **Central Hub** - Raspberry Pi with Home Assistant
2. **MQTT Broker** - Message communication
3. **Sensor Nodes** - ESP8266 with sensors
4. **Actuators** - Relays for lights/fans
5. **Mobile App** - Control interface

**Setup Steps:**
1. Install Raspbian/Home Assistant OS
2. Install Mosquitto MQTT broker
3. Configure Home Assistant
4. Program ESP nodes
5. Create automations

**Automation Ideas:**
- Lights on when motion detected
- AC control based on temperature
- Security alerts on phone
- Energy monitoring
- Voice control with Alexa

**Cost Breakdown:**
- Raspberry Pi: ₹5000
- ESP8266 nodes: ₹300 each
- Relays: ₹150 each
- Sensors: ₹50-500 each

Build room by room and expand gradually!`,
    category: "IoT",
    author: "Vikram Malhotra",
    date: "Dec 22, 2025",
    readTime: "18 min read",
    image: "/macbook-air-laptop-silver.jpg",
    featured: false,
    likes: 289,
  },
  {
    id: 9,
    title: "Battery Power Management for Portable Projects",
    excerpt: "Learn to design efficient battery-powered circuits with proper voltage regulation and power management.",
    fullContent: `Maximize battery life in your portable electronics projects!

**Battery Types:**
- **Li-ion 18650** - High capacity, rechargeable
- **LiPo** - Lightweight, various sizes
- **AA/AAA** - Easy to replace
- **9V** - Simple for beginners
- **Power Banks** - USB output

**Voltage Regulation:**
- **LM7805** - 5V linear regulator
- **LM317** - Adjustable output
- **Buck Converter** - Efficient step-down
- **Boost Converter** - Step-up voltage
- **TP4056** - Li-ion charging

**Power Saving Techniques:**
- Use sleep modes on microcontrollers
- Turn off unused peripherals
- Reduce clock speed when possible
- Use low-power sensors
- Optimize code efficiency

**Capacity Calculation:**
- Measure current consumption
- Calculate runtime = Battery capacity / Current
- Add 20% safety margin
- Consider voltage drop

**Charging Circuits:**
- TP4056 for single Li-ion
- BMS for multiple cells
- Solar charging options
- USB-C PD charging

**Safety:**
- Use protection circuits
- Monitor battery temperature
- Don't over-discharge
- Proper battery storage

Design smart power systems for longer runtime!`,
    category: "Electronics",
    author: "Pooja Reddy",
    date: "Dec 20, 2025",
    readTime: "13 min read",
    image: "/ipad-pro-tablet-with-stylus.jpg",
    featured: false,
    likes: 176,
  },
  {
    id: 10,
    title: "3D Printing for Electronics Enclosures",
    excerpt: "Design and print custom enclosures for your electronics projects using Fusion 360 and 3D printers.",
    fullContent: `Create professional-looking enclosures for your projects!

**Design Software:**
- **Fusion 360** - Free for hobbyists
- **Tinkercad** - Browser-based, easy
- **FreeCAD** - Open source
- **OnShape** - Cloud-based

**Design Principles:**
1. Measure your PCB dimensions
2. Add 2-3mm clearance
3. Design mounting posts
4. Plan cable access
5. Consider heat dissipation

**Features to Include:**
- Screw posts for PCB mounting
- Ventilation holes/slots
- LED light pipes
- Button access holes
- Cable management clips
- Snap-fit closures

**3D Printing Tips:**
- Use 0.2mm layer height
- 20% infill is sufficient
- Print with supports if needed
- PLA for most projects
- PETG for outdoor use

**Post-Processing:**
- Sand with progressively finer grits
- Use acetone vapor for ABS
- Paint with primer + spray paint
- Add rubber feet
- Use heat-set inserts for screws

**Popular Designs:**
- Raspberry Pi cases
- Arduino project boxes
- Sensor housings
- Robotics chassis
- Wall-mount enclosures

**Cost:**
- Entry 3D printer: ₹15000+
- Filament: ₹400/kg
- Per project: ₹20-100

Design once, print multiple copies easily!`,
    category: "Projects",
    author: "Rahul Sharma",
    date: "Dec 18, 2025",
    readTime: "16 min read",
    image: "/airpods-pro-white-wireless-earbuds.jpg",
    featured: false,
    likes: 245,
  },
  {
    id: 11,
    title: "Understanding I2C and SPI Communication",
    excerpt: "Master serial communication protocols for connecting sensors and modules to your microcontroller projects.",
    fullContent: `Learn the two most common communication protocols in electronics!

**I2C (Inter-Integrated Circuit):**
- Uses 2 wires: SDA (data), SCL (clock)
- Multiple devices on same bus
- Each device has unique address
- Speed: 100kHz (standard) to 3.4MHz (high-speed)
- Max distance: ~1 meter

**Common I2C Devices:**
- OLED displays
- RTC modules
- Accelerometers
- Temperature sensors
- EEPROM memory

**I2C Arduino Code:**
Wire library usage:
- Include Wire.h library
- Wire.begin() to start
- Wire.beginTransmission(address)
- Wire.write(data)
- Wire.endTransmission()

**SPI (Serial Peripheral Interface):**
- Uses 4 wires: MISO, MOSI, SCK, CS/SS
- Faster than I2C
- Full-duplex communication
- Separate CS for each device
- Speed: Up to 10MHz+

**Common SPI Devices:**
- SD card modules
- RF modules (NRF24L01)
- TFT displays
- Flash memory
- DAC/ADC chips

**When to Use What:**
- I2C: Multiple sensors, short distance
- SPI: High-speed data, displays
- UART: Simple point-to-point

**Troubleshooting:**
- Check pull-up resistors (I2C)
- Verify correct addresses
- Use logic analyzer
- Check wiring and connections

Master these protocols to expand your project possibilities!`,
    category: "Electronics",
    author: "Arjun Menon",
    date: "Dec 15, 2025",
    readTime: "12 min read",
    image: "/image 1.jpg",
    featured: false,
    likes: 192,
  },
  {
    id: 12,
    title: "Building Line Following Robot",
    excerpt: "Complete guide to building an autonomous line-following robot using IR sensors and Arduino.",
    fullContent: `Build a robot that follows black lines - perfect beginner robotics project!

**Components Required:**
- Arduino UNO
- L298N motor driver
- 2x DC BO motors (300 RPM)
- IR sensor array (5 sensors)
- Robot chassis kit
- 7.4V Li-ion battery
- Wheels and caster

**Circuit Connection:**
1. Connect motors to L298N
2. L298N to Arduino (IN1-IN4)
3. IR sensors to digital pins
4. Power everything from battery

**Algorithm:**
- All sensors on white → Move forward
- Left sensor on black → Turn left
- Right sensor on black → Turn right
- All sensors on black → Stop/Junction
- Middle sensor on black → Move straight

**PID Control (Advanced):**
Improve smooth movement with PID:
- Calculate error from center
- Adjust motor speeds dynamically
- Tune Kp, Ki, Kd values

**Code Structure:**
Main loop:
- Read sensor values
- Calculate error
- Adjust motor speeds
- Move forward if centered

**Testing:**
- Start with slow speed
- Test on black tape/white surface
- Adjust sensor height (5-10mm)
- Calibrate sensor thresholds
- Increase speed gradually

**Competition Tips:**
- Use PID for smooth turns
- Optimize gear ratio
- Reduce weight
- Use proper tires
- Practice on actual track

Total cost: ~₹2500 | Build time: 4-6 hours`,
    category: "Robotics",
    author: "Sanjay Kumar",
    date: "Dec 12, 2025",
    readTime: "20 min read",
    image: "/image 2.jpg",
    featured: false,
    likes: 312,
  },
]

const categories = ["All", "Electronics", "IoT", "Robotics", "Projects", "Comparison"]

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="py-12 border-b bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2874F0]/10 mb-6">
              <BookOpen className="w-4 h-4 text-[#2874F0]" />
              <span className="text-sm font-semibold text-[#2874F0]">Electronics Blog</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Learn Electronics & IoT
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Tutorials, guides, and tips for makers, students, and hobbyists
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-12 pr-4 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b sticky top-16 bg-white shadow-sm z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category
                  ? "bg-[#2874F0] hover:bg-[#2366d1] text-white whitespace-nowrap"
                  : "whitespace-nowrap border-gray-300 text-gray-700 hover:border-[#2874F0] hover:text-[#2874F0]"
                }
              >
                <Tag className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === "All" && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Badge className="bg-[#2874F0] text-white border-0">Featured</Badge>
              <h2 className="text-2xl font-bold text-black">Top Article</h2>
            </div>
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-gray-200 bg-white">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-full min-h-[400px] overflow-hidden bg-gray-100">
                  <Image
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent lg:bg-gradient-to-r" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge className="w-fit mb-4 bg-[#2874F0] text-white border-0">
                    {blogPosts[0].category}
                  </Badge>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-[#2874F0] transition-colors text-black">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-gray-700 mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-fit bg-[#2874F0] hover:bg-[#2366d1] text-white">
                        Read Full Article
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
                      <DialogHeader>
                        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={blogPosts[0].image}
                            alt={blogPosts[0].title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <DialogTitle className="text-3xl text-black">{blogPosts[0].title}</DialogTitle>
                        <DialogDescription className="flex items-center gap-4 text-sm pt-2 text-gray-700">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {blogPosts[0].author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {blogPosts[0].date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {blogPosts[0].readTime}
                          </span>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="prose prose-sm max-w-none mt-4 whitespace-pre-line text-black">
                        {blogPosts[0].fullContent}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">
            {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts
              .filter((post) => selectedCategory !== "All" || !post.featured)
              .map((post) => (
                <Dialog key={post.id}>
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-gray-200 bg-white">
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <Badge className="absolute top-3 right-3 bg-[#2874F0] text-white border-0">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-[#2874F0] transition-colors text-black">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <User className="w-3.5 h-3.5" />
                          <span>{post.author}</span>
                        </div>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-[#2874F0] hover:text-[#2366d1]">
                            Read More →
                          </Button>
                        </DialogTrigger>
                      </div>
                    </div>
                  </Card>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
                    <DialogHeader>
                      <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <DialogTitle className="text-3xl text-black">{post.title}</DialogTitle>
                      <DialogDescription className="flex items-center gap-4 text-sm pt-2 text-gray-700">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="prose prose-sm max-w-none mt-4 whitespace-pre-line text-black">
                      {post.fullContent}
                    </div>
                    <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
                      <Button variant="outline" className="flex-1 border-gray-300 text-black hover:bg-gray-50">
                        <Heart className="w-4 h-4 mr-2" />
                        Like ({post.likes})
                      </Button>
                      <Button variant="outline" className="flex-1 border-gray-300 text-black hover:bg-gray-50">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-gray-200 shadow-xl bg-white">
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#2874F0] flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-black">Stay Updated</h2>
              <p className="text-gray-700 mb-6">
                Get the latest electronics tutorials and project ideas delivered to your inbox
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email" 
                  type="email" 
                  className="flex-1 bg-white border-gray-200 text-black placeholder:text-gray-400" 
                />
                <Button className="bg-[#2874F0] hover:bg-[#2366d1] text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
