import glob,os
d=os.path.dirname(os.path.abspath(__file__))
files=sorted(glob.glob(d+'/[0-9][0-9]_*.js'))
open(d+'/bundle.js','w',encoding='utf-8').write('\n'.join(open(f,encoding='utf-8').read() for f in files))
print('bundle',len(files),'modules')
