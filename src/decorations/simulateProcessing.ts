import 'colors';

/**
 * This function is just crreated for decoration purposes. It will simulate that some task are processing and take some time, as opposed of resolving immediately
 */
export function simulateProcessing() {
  return new Promise(resolve => {
    for (let i = 1; i <= 5; i++) {
      if (i === 1) {
        setTimeout(() => console.log('\nPROCESSING...'.cyan), i * 1000)
      } else if (i === 5) {
        setTimeout(() => {
          console.log('\n');
          resolve();
        }, i * 1000)
      } else {
        setTimeout(() => console.log(`\n${5 - i}`.green), i * 1000)
      }
    }
  })
}