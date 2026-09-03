import re

with open('src/components/FAQ.tsx', 'r') as f:
    content = f.read()

# Remove the Contact block
old_block = r'''        <motion\.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView \? { opacity: 1 } : {}}
          transition={{ delay: 0\.5 }}
        >
          <p className="text-gray-400 mb-6 text-base">
            Still have questions\? We're here to help!
          </p>
          <Button variant="neon" size="lg" onClick={handleContact}>
            Contact Us
          </Button>
        </motion\.div>'''

content = re.sub(old_block, '', content)

# Remove the handleContact function to clean up
handle_func = r'''  const handleContact = \(\) => \{
    const isMobile = /Mobi\|Android/i\.test\(navigator\.userAgent\);
    if \(isMobile\) \{
      window\.location\.href = 'tel:\+919728014818';
    \} else \{
      window\.location\.href =
        'https://mail\.google\.com/mail/\?view=cm&fs=1&to=iic\.muj@gmail\.com&su=Inquiry%20Regarding%20IIC%203\.0&body=Hi%20IIC%20Team,%0D%0A%0D%0A';
    \}
  \};'''

content = re.sub(handle_func, '', content)

with open('src/components/FAQ.tsx', 'w') as f:
    f.write(content)
