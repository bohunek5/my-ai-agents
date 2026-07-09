import zipfile
z = zipfile.ZipFile('/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/out.zip', 'r')
print(z.namelist()[:10])
