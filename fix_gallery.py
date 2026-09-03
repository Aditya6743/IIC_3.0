import re

with open('src/components/GalleryContent.tsx', 'r') as f:
    content = f.read()

# Remove 'Ceremony' and 'Winners' from the type definition
content = content.replace("category: 'IIC 1.0' | 'IIC 2.0' | 'Workshops' | 'Ceremony' | 'Winners';", "category: 'IIC 1.0' | 'IIC 2.0' | 'Workshops';")

# Remove from categories array
content = content.replace("const categories = ['All', 'IIC 1.0', 'IIC 2.0', 'Workshops', 'Ceremony', 'Winners'] as const;", "const categories = ['All', 'IIC 1.0', 'IIC 2.0', 'Workshops'] as const;")

# Reassign the items to 'IIC 2.0' or 'IIC 1.0' so the images aren't lost, or delete them?
# If I delete them, the gallery drops from 15 to 9 images. The user said "remove ceremony and winners from gallrey".
# It implies they don't want to see those *sections* (the tabs). Let me just delete the items entirely.

old_items = '''const galleryItems: GalleryItem[] = [
  { image: '/media/20241115_101932.jpg', text: 'Opening Session', category: 'Ceremony', caption: 'Inaugural address of IIC 2024 by university leadership.', date: 'Nov 15, 2024', aspect: 'aspect-[4/3]' },
  { image: '/media/20241115_224002.jpg', text: 'Late Night Hacking', category: 'IIC 1.0', caption: 'Participants developing prototypes past midnight.', date: 'Nov 15, 2024', aspect: 'aspect-[4/3]' },
  { image: '/media/20241115_224201.jpg', text: 'Mentor Interaction', category: 'Workshops', caption: 'Expert mentors assisting teams with engineering design.', date: 'Nov 15, 2024', aspect: 'aspect-[4/3]' },
  { image: '/media/20241116_122330.jpg', text: 'Pitch Presentation', category: 'IIC 2.0', caption: 'Final prototype demonstration in front of panel judges.', date: 'Nov 16, 2024', aspect: 'aspect-[4/3]' },
  { image: '/media/IMG_0001.jpeg', text: 'Team Brainstorming', category: 'IIC 1.0', caption: 'Developing the initial concept and system architecture.', date: 'Nov 15, 2024', aspect: 'aspect-[4/3]' },
  { image: '/media/IMG_1930.JPG', text: 'Hardware Assembly', category: 'Workshops', caption: 'Integrating IoT components and microcontroller boards.', date: 'Nov 15, 2024', aspect: 'aspect-[3/4]' },
  { image: '/media/IMG_2016.JPG', text: 'Colleague Coding', category: 'IIC 1.0', caption: 'Collaborative development of the web client backend.', date: 'Nov 15, 2024', aspect: 'aspect-[3/4]' },
  { image: '/media/IMG_2025.JPG', text: 'Deep Focus', category: 'IIC 2.0', caption: 'Putting final touches on the user interface before the demo.', date: 'Nov 16, 2024', aspect: 'aspect-[3/4]' },
  { image: '/media/IMG_2028.JPG', text: 'Testing & Calibration', category: 'IIC 2.0', caption: 'Testing and debugging sensor inputs on the test rig.', date: 'Nov 16, 2024', aspect: 'aspect-[3/4]' },
  { image: '/media/IMG_2038.JPG', text: 'Innovation Showcase', category: 'Ceremony', caption: 'Attendees exploring interactive project stalls.', date: 'Nov 16, 2024', aspect: 'aspect-[3/4]' },
  { image: '/media/IMG_2094.JPG', text: 'Closing Panel', category: 'Ceremony', caption: 'Panel discussion on the future of strategic tech.', date: 'Nov 16, 2024', aspect: 'aspect-[3/4]' },
  { image: '/media/IMG_2121.JPG', text: 'Victory Celebration', category: 'Winners', caption: 'Team celebrating after securing a podium finish.', date: 'Nov 16, 2024', aspect: 'aspect-[3/4]' },
  { image: '/media/IMG_20241116_015025_570.jpg', text: 'Winner Announcement', category: 'Winners', caption: 'Awarding the first prize for smart village solutions.', date: 'Nov 16, 2024', aspect: 'aspect-[3/4]' },
  { image: '/media/IMG20241115230723.jpg', text: 'Hackathon Crowd', category: 'IIC 1.0', caption: 'Over 500 innovators gathered at the central arena.', date: 'Nov 15, 2024', aspect: 'aspect-[4/3]' },
  { image: '/media/IMG_0004.jpeg', text: 'Team Portrait', category: 'Winners', caption: 'Group picture of the project team with their awards.', date: 'Nov 16, 2024', aspect: 'aspect-[4/3]' },
];'''

new_items = '''const galleryItems: GalleryItem[] = [
  { image: '/media/20241115_224002.jpg', text: 'Late Night Hacking', category: 'IIC 1.0', caption: 'Participants developing prototypes past midnight.', date: 'Nov 15, 2024', aspect: 'aspect-[4/3]' },
  { image: '/media/20241115_224201.jpg', text: 'Mentor Interaction', category: 'Workshops', caption: 'Expert mentors assisting teams with engineering design.', date: 'Nov 15, 2024', aspect: 'aspect-[4/3]' },
  { image: '/media/20241116_122330.jpg', text: 'Pitch Presentation', category: 'IIC 2.0', caption: 'Final prototype demonstration in front of panel judges.', date: 'Nov 16, 2024', aspect: 'aspect-[4/3]' },
  { image: '/media/IMG_0001.jpeg', text: 'Team Brainstorming', category: 'IIC 1.0', caption: 'Developing the initial concept and system architecture.', date: 'Nov 15, 2024', aspect: 'aspect-[4/3]' },
  { image: '/media/IMG_1930.JPG', text: 'Hardware Assembly', category: 'Workshops', caption: 'Integrating IoT components and microcontroller boards.', date: 'Nov 15, 2024', aspect: 'aspect-[3/4]' },
  { image: '/media/IMG_2016.JPG', text: 'Colleague Coding', category: 'IIC 1.0', caption: 'Collaborative development of the web client backend.', date: 'Nov 15, 2024', aspect: 'aspect-[3/4]' },
  { image: '/media/IMG_2025.JPG', text: 'Deep Focus', category: 'IIC 2.0', caption: 'Putting final touches on the user interface before the demo.', date: 'Nov 16, 2024', aspect: 'aspect-[3/4]' },
  { image: '/media/IMG_2028.JPG', text: 'Testing & Calibration', category: 'IIC 2.0', caption: 'Testing and debugging sensor inputs on the test rig.', date: 'Nov 16, 2024', aspect: 'aspect-[3/4]' },
  { image: '/media/IMG20241115230723.jpg', text: 'Hackathon Crowd', category: 'IIC 1.0', caption: 'Over 500 innovators gathered at the central arena.', date: 'Nov 15, 2024', aspect: 'aspect-[4/3]' },
];'''

content = content.replace(old_items, new_items)

with open('src/components/GalleryContent.tsx', 'w') as f:
    f.write(content)
