with open('src/components/Timeline.tsx', 'r') as f:
    content = f.read()

# Reduce the tilt angle from 12 degrees to 5 degrees
content = content.replace(
    'const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);',
    'const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);'
)
content = content.replace(
    'const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);',
    'const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);'
)

with open('src/components/Timeline.tsx', 'w') as f:
    f.write(content)
