const messages = {
  en: {
    home: {
      badge: 'Game Manager',
      title: 'Party Game Hub',
      subtitle: 'Manage players, launch games, and keep the rulebook in one place.',
      nickname: 'Nickname',
      nicknamePlaceholder: 'Enter a nickname',
      start: 'Start Game',
      showRules: 'Show Rules',
      enterGame: 'Enter Game',
      manageLibrary: 'Manage Library',
      roundFlow: 'Round Flow',
      timeline: [
        '1. Enter a nickname and enter the balloon round.',
        '2. Tap to inflate. The pressure rises every time.',
        '3. When it bursts, draw one blindbox card.',
        '4. View the result page, replay, or share.'
      ],
      rulesTitle: 'Rules',
      rulesConfirm: 'OK',
      quickNames: ['Balloon Ace', 'Stay Calm', 'Box Lucky'],
      rules: [
        'Enter a nickname and start the round.',
        'Each tap inflates the balloon. The blast threshold is random from 5 to 15.',
        'After the balloon bursts, draw one blindbox card.',
        'Check the final report, replay, or share the result.'
      ],
      language: 'Language',
      switchToZh: '\u4e2d\u6587',
      switchToEn: 'English',
      playerCardTitle: 'Active Player',
      playerHint: 'Set the nickname once, then use it across all games.',
      libraryTitle: 'Game Library',
      libraryHint: 'Available now',
      manualTitle: 'Manual Center',
      dataTitle: 'Punishment Data',
      dataHint: 'Current bank overview',
      totalQuestions: 'Total Entries',
      themeDistribution: 'Theme Distribution',
      starDistribution: 'Star Distribution',
      themeClassic: 'Classic',
      themeFriends: 'Friends',
      themeParty: 'Party',
      themeCouple: 'Couple',
      themeWork: 'Work',
      balloonManual: 'Balloon Manual',
      blindboxManual: 'Blindbox Manual',
      comingSoon: 'Coming Soon',
      startThisGame: 'Play This Game',
      gameStatusReady: 'Ready',
      gameStatusSoon: 'Planned',
      gameBalloonTitle: 'Balloon Blindbox',
      gameBalloonDesc: 'Pump the balloon until it bursts, then draw a blindbox punishment card.',
      gameRhythmTitle: 'Rhythm Duel',
      gameRhythmDesc: 'Reserved slot for a future rhythm party game.',
      gameTruthTitle: 'Truth Table',
      gameTruthDesc: 'Reserved slot for a future multi-player truth challenge.',
      manualModalTitle: 'Manual',
      manualBalloonSummary: [
        'Balloon round: keep pumping until the random threshold is reached.',
        'The closer you get to the threshold, the higher the pressure feedback.',
        'After bursting, the game enters the blindbox draw page automatically.'
      ],
      manualBlindboxSummary: [
        'Blindbox round: flip one card to reveal rarity and punishment.',
        'Punishments are stored in JSON and include star-based difficulty.',
        'You can replay the round or continue to the result page after drawing.'
      ]
    },
    start: {
      nav: 'Game Start',
      badge: 'Balloon Blindbox',
      title: 'Set the player, read the rules, then start the round.',
      subtitle: 'This page is the in-game lobby. It contains the full flow, card effects, and punishment library entry.',
      playerTitle: 'Current Player',
      playerHint: 'The saved nickname will be used throughout this round.',
      startNow: 'Start Balloon Round',
      startLocal: 'Start Local Round',
      startOnline: 'Open Multiplayer Room',
      editLibrary: 'Edit Punishment Library',
      rulesTitle: 'Core Rules',
      flowTitle: 'Round Flow',
      manualTitle: 'Detailed Manual',
      cardsTitle: 'Card Guide',
      notesTitle: 'Execution Notes',
      rules: [
        'One player enters the balloon round and keeps tapping to inflate.',
        'The balloon explodes at a random threshold from 5 to 15 taps.',
        'After exploding, the player flips one blindbox card to determine card rarity.',
        'The card gives a privilege effect, but the game still reveals a concrete punishment question.',
        'That punishment can then be executed by yourself, transferred, shared, or replaced according to the card effect.'
      ],
      flow: [
        '1. Confirm nickname and enter the balloon page.',
        '2. Inflate until the balloon bursts. More taps raise the punishment star target.',
        '3. Flip one card on the blindbox page to reveal N, SR, SSR, or UR.',
        '4. Read both the card effect and the punishment question shown below it.',
        '5. Execute the punishment directly or assign the target player according to the card effect.',
        '6. Open the result page to review the round and then start another round.'
      ],
      manual: [
        'The game has two layers: card rarity decides privilege, while the punishment bank decides the actual task.',
        'Punishment star level is based on balloon taps: 1-6 taps gives 1 star, 7-8 gives 2 stars, 9-10 gives 3 stars, 11-12 gives 4 stars, 13+ gives 5 stars.',
        'If the exact star level is unavailable, the game falls back to a lower star punishment that is still executable.',
        'Privilege-only items are excluded from the displayed punishment question so the assigned player always has a real task to do.',
        'You can edit the punishment bank in-app. Changes are stored locally on the device and affect future draws immediately.'
      ],
      notes: [
        'N: No privilege. The drawer executes the revealed punishment directly.',
        'SR: Redirect privilege. You may transfer the revealed punishment to another player, or keep it and change how the group answers.',
        'SSR: Shared punishment. You may designate another player to do the same revealed punishment with you.',
        'UR: Full exemption. You avoid the punishment, but must still use the revealed question to appoint a substitute target.',
        'When using SR, SSR, or UR, always use the revealed punishment text as the final task content.'
      ],
      cards: {
        N: {
          title: 'Normal Punishment',
          effect: 'No protection. The revealed punishment belongs to the player who drew the card.',
          detail: 'Use when you want a direct result with no extra rule handling.'
        },
        SR: {
          title: 'Mirror Shield',
          effect: 'You may redirect the revealed punishment to another player.',
          detail: 'The punishment text must still be shown. After seeing it, choose whether to keep it or hand it to someone else.'
        },
        SSR: {
          title: 'Double Trouble',
          effect: 'You may pick one player to take the revealed punishment with you.',
          detail: 'The other player is selected after the question is revealed, so everyone knows the exact shared task.'
        },
        UR: {
          title: 'Golden Pass',
          effect: 'You are exempt, but the revealed punishment remains valid for a substitute player.',
          detail: 'This card removes your own obligation, not the punishment content. Use the displayed question to appoint the new target.'
        }
      }
    },
    room: {
      nav: 'Multiplayer Room',
      title: 'Realtime Room',
      subtitle: 'Create a room, share the room code, and wait for everyone to join before starting.',
      serverLabel: 'Server URL',
      roomCodeLabel: 'Room Code',
      roomCodePlaceholder: 'Enter room code',
      roomIdTitle: 'Current Room',
      playerListTitle: 'Players',
      createRoom: 'Create Room',
      joinRoom: 'Join Room',
      startGame: 'Start Multiplayer Game',
      syncRoom: 'Refresh Room State',
      goBattle: 'Go To Round',
      hostBadge: 'Host',
      guestHint: 'Only the host can start the room.',
      waiting: 'Waiting for players',
      connected: 'Connected',
      disconnected: 'Disconnected',
      needName: 'Please enter a nickname first.',
      needRoomCode: 'Please enter a room code.',
      needServer: 'Please enter a server URL.',
      playerCountHint: 'At least 2 players are required to start.',
      lobbyHint: 'The host controls the start of the room.',
      startReady: 'Room is no longer in lobby. Entering round page.'
    },
    online: {
      nav: 'Multiplayer Round',
      title: 'Realtime Balloon Round',
      roomTitle: 'Room',
      currentTurn: 'Current Turn',
      status: 'Status',
      taps: 'Taps',
      threshold: 'Threshold',
      tapNow: 'Tap Balloon',
      waitTurn: 'Waiting For Turn',
      waitingResolve: 'Waiting For Resolution',
      resolveRound: 'Confirm Resolution',
      nextRound: 'Start Next Round',
      chooseTarget: 'Choose Target Player',
      choosePartner: 'Choose One Partner',
      chooseSubstitute: 'Choose Substitute',
      roundLoser: 'Exploded By',
      resultTitle: 'Blindbox Result',
      questionTitle: 'Punishment Question',
      resolutionTitle: 'Resolution',
      lobbyBack: 'Back To Room',
      statuses: {
        lobby: 'Lobby',
        playing: 'Playing',
        resolving: 'Resolving',
        finished: 'Finished'
      },
      waitingMessages: {
        yourTurn: 'It is your turn. One tap only.',
        otherTurn: 'Another player is acting now.',
        resolving: 'Waiting for the loser to decide final targets.',
        finished: 'This round is resolved. Start the next round when ready.'
      }
    },
    balloon: {
      nav: 'Balloon Round',
      player: 'Player',
      pumps: 'Pumps',
      risk: 'Risk',
      pumpIt: 'Pump It',
      burst: 'Balloon Burst',
      backHome: 'Back Home',
      anonymous: 'Anonymous',
      taunts: ['Stay calm', 'No shaky hands', 'Not the limit yet', 'Almost bursting', 'Brave one'],
      ready: 'Ready when you are.',
      firstHint: 'Each tap pushes the balloon closer to fate.',
      redirectHint: 'Burst. Redirecting to blindbox in 1.5 seconds.',
      low: 'Low',
      rising: 'Rising',
      critical: 'Critical',
      hintLow: 'Still safe for now, but not for long.',
      hintMid: 'The balloon is getting unstable.',
      hintHigh: 'One more tap feels dangerous.'
    },
    blindbox: {
      nav: 'Blindbox',
      title: 'You burst. Pick your fate.',
      subtitle: 'Tap one card to reveal the result. One flip per round.',
      starSuffix: 'Star',
      punishmentHint: 'More pumps mean a heavier punishment difficulty.',
      waiting: 'Waiting',
      playAgain: 'Play Again',
      openResult: 'Open Result'
    },
    result: {
      nav: 'Result',
      pumps: 'Pumps',
      result: 'Result',
      reward: 'Reward',
      questionType: 'Question Type',
      roundQuestion: 'Round Question',
      share: 'Share',
      playAgain: 'Play Again',
      backHome: 'Back Home',
      missingQuestionType: 'Truth',
      missingQuestion: 'No question was loaded. Draw another round.',
      summary: (clickCount, level, title) => `You survived ${clickCount} pumps and drew ${level} ${title}.`,
      shareTitle: (playerName, clickCount, level) => `${playerName} survived ${clickCount} pumps and drew ${level}!`
    },
    rewards: {
      UR: { title: 'Golden Pass', effect: 'You are safe this round and may choose another player to take the punishment.' },
      SSR: { title: 'Double Trouble', effect: 'You may drag one more player into the challenge with you.' },
      SR: { title: 'Mirror Shield', effect: 'You may redirect the question or force everyone to answer once.' },
      N: { title: 'Normal Punishment', effect: 'No escape. Take the question directly.' }
    },
    questions: {
      truth: 'Truth',
      dare: 'Dare',
      privilege: 'Privilege'
    },
    library: {
      nav: 'Punishment Library',
      title: 'Punishment Library Management',
      subtitle: 'Add, edit, and remove punishments. Changes are saved locally and used by future rounds immediately.',
      createTitle: 'Editor',
      listTitle: 'Current Entries',
      addNew: 'New Entry',
      save: 'Save Entry',
      cancelEdit: 'Cancel Edit',
      reset: 'Reset to Default',
      empty: 'No entries yet in this rarity.',
      level: 'Rarity',
      type: 'Type',
      theme: 'Theme',
      star: 'Star',
      english: 'English',
      chinese: 'Chinese',
      edit: 'Edit',
      remove: 'Delete',
      confirmRemove: 'Delete this punishment entry?',
      saved: 'Saved',
      deleted: 'Deleted',
      resetDone: 'Reset complete',
      validation: 'Please complete both Chinese and English text.',
      levelOptions: { N: 'N', SR: 'SR', SSR: 'SSR', UR: 'UR' },
      typeOptions: { Truth: 'Truth', Dare: 'Dare', Privilege: 'Privilege' },
      themeOptions: {
        classic: 'Classic',
        friends: 'Friends',
        party: 'Party',
        couple: 'Couple',
        work: 'Work'
      }
    }
  },
  zh: {
    home: {
      badge: '\u6e38\u620f\u7ba1\u7406',
      title: '\u6d3e\u5bf9\u6e38\u620f\u4e2d\u5fc3',
      subtitle: '\u628a\u73a9\u5bb6\u3001\u6e38\u620f\u5165\u53e3\u548c\u8bf4\u660e\u624b\u518c\u90fd\u653e\u5728\u4e00\u4e2a\u9996\u9875\u91cc\u7ba1\u7406\u3002',
      nickname: '\u6635\u79f0',
      nicknamePlaceholder: '\u8f93\u5165\u4e00\u4e2a\u73a9\u5bb6\u6635\u79f0',
      start: '\u5f00\u59cb\u6e38\u620f',
      showRules: '\u67e5\u770b\u89c4\u5219',
      enterGame: '\u8fdb\u5165\u6e38\u620f',
      manageLibrary: '\u9898\u5e93\u7ba1\u7406',
      roundFlow: '\u672c\u5c40\u6d41\u7a0b',
      timeline: [
        '1. \u8f93\u5165\u6635\u79f0\uff0c\u8fdb\u5165\u6c14\u7403\u6311\u6218\u3002',
        '2. \u4e0d\u65ad\u70b9\u51fb\u5145\u6c14\uff0c\u5371\u9669\u4f1a\u8d8a\u6765\u8d8a\u9ad8\u3002',
        '3. \u6c14\u7403\u7206\u70b8\u540e\uff0c\u62bd\u4e00\u5f20\u76f2\u76d2\u5361\u3002',
        '4. \u67e5\u770b\u6218\u7ee9\uff0c\u7136\u540e\u518d\u6765\u4e00\u5c40\u6216\u5206\u4eab\u3002'
      ],
      rulesTitle: '\u6e38\u620f\u89c4\u5219',
      rulesConfirm: '\u77e5\u9053\u4e86',
      quickNames: ['\u6c14\u7403\u738b\u8005', '\u7a33\u4f4f\u522b\u70b8', '\u76f2\u76d2\u6b27\u7687'],
      rules: [
        '\u8f93\u5165\u6635\u79f0\u540e\u5f00\u59cb\u6e38\u620f\uff0c\u8fdb\u5165\u6c14\u7403\u5145\u6c14\u9636\u6bb5\u3002',
        '\u6bcf\u6b21\u70b9\u51fb\u90fd\u4f1a\u8ba9\u6c14\u7403\u53d8\u5927\uff0c\u7206\u70b8\u9608\u503c\u4f1a\u5728 5 \u5230 15 \u4e4b\u95f4\u968f\u673a\u751f\u6210\u3002',
        '\u6c14\u7403\u7206\u70b8\u540e\u8fdb\u5165\u76f2\u76d2\u62bd\u53d6\uff0c\u5956\u6c60\u5305\u542b N\u3001SR\u3001SSR\u3001UR \u56db\u79cd\u7ed3\u679c\u3002',
        '\u62bd\u5361\u540e\u53ef\u4ee5\u518d\u6765\u4e00\u5c40\uff0c\u4e5f\u53ef\u4ee5\u8fdb\u5165\u6218\u7ee9\u9875\u5206\u4eab\u672c\u5c40\u7ed3\u679c\u3002'
      ],
      language: '\u8bed\u8a00',
      switchToZh: '\u4e2d\u6587',
      switchToEn: 'English',
      playerCardTitle: '\u5f53\u524d\u73a9\u5bb6',
      playerHint: '\u5148\u8bbe\u7f6e\u6635\u79f0\uff0c\u540e\u9762\u6240\u6709\u6e38\u620f\u90fd\u53ef\u4ee5\u76f4\u63a5\u590d\u7528\u3002',
      libraryTitle: '\u6e38\u620f\u5e93',
      libraryHint: '\u5df2\u4e0a\u7ebf',
      manualTitle: '\u624b\u518c\u4e2d\u5fc3',
      dataTitle: '\u9898\u5e93\u7ba1\u7406',
      dataHint: '\u5f53\u524d\u60e9\u7f5a\u9898\u5e93\u6982\u51b5',
      totalQuestions: '\u9898\u5e93\u603b\u6570',
      themeDistribution: '\u4e3b\u9898\u5206\u5e03',
      starDistribution: '\u661f\u7ea7\u5206\u5e03',
      themeClassic: '\u7ecf\u5178',
      themeFriends: '\u670b\u53cb',
      themeParty: '\u6d3e\u5bf9',
      themeCouple: '\u60c5\u4fa3',
      themeWork: '\u804c\u573a',
      balloonManual: '\u6c14\u7403\u624b\u518c',
      blindboxManual: '\u76f2\u76d2\u624b\u518c',
      comingSoon: '\u5373\u5c06\u4e0a\u7ebf',
      startThisGame: '\u5f00\u59cb\u8fd9\u4e2a\u6e38\u620f',
      gameStatusReady: '\u53ef\u73a9',
      gameStatusSoon: '\u7b79\u5907\u4e2d',
      gameBalloonTitle: '\u6c14\u7403\u76f2\u76d2',
      gameBalloonDesc: '\u5148\u72c2\u70b9\u5145\u6c14\uff0c\u7206\u70b8\u540e\u518d\u62bd\u76f2\u76d2\u60e9\u7f5a\u5361\u3002',
      gameRhythmTitle: '\u8282\u594f\u5bf9\u51b3',
      gameRhythmDesc: '\u9884\u7559\u7684\u540e\u7eed\u97f3\u4e50\u6d3e\u5bf9\u6e38\u620f\u5361\u4f4d\u3002',
      gameTruthTitle: '\u771f\u8bdd\u684c',
      gameTruthDesc: '\u9884\u7559\u7684\u591a\u4eba\u771f\u5fc3\u8bdd\u6311\u6218\u6e38\u620f\u5361\u4f4d\u3002',
      manualModalTitle: '\u8bf4\u660e\u624b\u518c',
      manualBalloonSummary: [
        '\u6c14\u7403\u9636\u6bb5\uff1a\u6301\u7eed\u70b9\u51fb\u5145\u6c14\uff0c\u76f4\u5230\u78b0\u5230\u968f\u673a\u7206\u70b8\u9608\u503c\u3002',
        '\u8d8a\u63a5\u8fd1\u9608\u503c\uff0c\u9707\u52a8\u548c\u5371\u9669\u63d0\u793a\u4f1a\u8d8a\u5f3a\u3002',
        '\u7206\u70b8\u540e\u4f1a\u81ea\u52a8\u8fdb\u5165\u76f2\u76d2\u62bd\u53d6\u9875\u9762\u3002'
      ],
      manualBlindboxSummary: [
        '\u76f2\u76d2\u9636\u6bb5\uff1a\u7ffb\u5f00\u4e00\u5f20\u5361\u67e5\u770b\u7a00\u6709\u5ea6\u548c\u60e9\u7f5a\u3002',
        '\u60e9\u7f5a\u9898\u76ee\u7531 JSON \u7ba1\u7406\uff0c\u5e76\u652f\u6301\u661f\u7ea7\u96be\u5ea6\u3002',
        '\u62bd\u5b8c\u540e\u53ef\u4ee5\u91cd\u5f00\u6216\u8fdb\u5165\u6218\u7ee9\u9875\u3002'
      ]
    },
    start: {
      nav: '\u6e38\u620f\u5f00\u59cb',
      badge: '\u6c14\u7403\u76f2\u76d2',
      title: '\u5148\u786e\u8ba4\u73a9\u5bb6\uff0c\u518d\u770b\u89c4\u5219\u548c\u624b\u518c\uff0c\u7136\u540e\u5f00\u5c40\u3002',
      subtitle: '\u8fd9\u91cc\u662f\u6e38\u620f\u5185\u7684\u5f00\u59cb\u754c\u9762\uff0c\u5305\u542b\u5b8c\u6574\u73a9\u6cd5\u3001\u5361\u724c\u6548\u679c\u548c\u9898\u5e93\u5165\u53e3\u3002',
      playerTitle: '\u5f53\u524d\u73a9\u5bb6',
      playerHint: '\u672c\u5c40\u4f1a\u5168\u7a0b\u4f7f\u7528\u8fd9\u4e2a\u6635\u79f0\u3002',
      startNow: '\u5f00\u59cb\u6c14\u7403\u6311\u6218',
      startLocal: '\u5f00\u59cb\u672c\u5730\u5c40',
      startOnline: '\u8fdb\u5165\u8054\u673a\u623f\u95f4',
      editLibrary: '\u7f16\u8f91\u60e9\u7f5a\u9898\u5e93',
      rulesTitle: '\u6838\u5fc3\u89c4\u5219',
      flowTitle: '\u6e38\u620f\u6d41\u7a0b',
      manualTitle: '\u8be6\u7ec6\u624b\u518c',
      cardsTitle: '\u5361\u724c\u8bf4\u660e',
      notesTitle: '\u6267\u884c\u8bf4\u660e',
      rules: [
        '\u4e00\u540d\u73a9\u5bb6\u5148\u8fdb\u5165\u6c14\u7403\u9636\u6bb5\uff0c\u4e0d\u65ad\u70b9\u51fb\u5145\u6c14\u3002',
        '\u6c14\u7403\u4f1a\u5728 5 \u5230 15 \u6b21\u4e4b\u95f4\u7684\u968f\u673a\u9608\u503c\u7206\u70b8\u3002',
        '\u7206\u70b8\u540e\u7ffb\u5f00\u4e00\u5f20\u76f2\u76d2\u5361\uff0c\u51b3\u5b9a\u62bd\u5230 N\u3001SR\u3001SSR \u6216 UR\u3002',
        '\u5361\u724c\u51b3\u5b9a\u7279\u6743\u6548\u679c\uff0c\u4f46\u9875\u9762\u4ecd\u4f1a\u540c\u65f6\u5c55\u793a\u4e00\u6761\u5177\u4f53\u60e9\u7f5a\u9898\u3002',
        '\u4f60\u53ef\u4ee5\u6839\u636e\u5361\u724c\u6548\u679c\uff0c\u628a\u8fd9\u6761\u60e9\u7f5a\u81ea\u5df1\u6267\u884c\u3001\u8f6c\u7ed9\u522b\u4eba\u3001\u6216\u62c9\u4eba\u4e00\u8d77\u6267\u884c\u3002'
      ],
      flow: [
        '1. \u786e\u8ba4\u6635\u79f0\u540e\u8fdb\u5165\u6c14\u7403\u9875\u3002',
        '2. \u4e0d\u65ad\u70b9\u51fb\uff0c\u76f4\u5230\u6c14\u7403\u7206\u70b8\uff0c\u5145\u6c14\u8d8a\u591a\u5bf9\u5e94\u661f\u7ea7\u8d8a\u9ad8\u3002',
        '3. \u8fdb\u5165\u76f2\u76d2\u9875\uff0c\u7ffb\u5f00\u4e00\u5f20\u5361\u67e5\u770b N/SR/SSR/UR \u7ed3\u679c\u3002',
        '4. \u540c\u65f6\u9605\u8bfb\u5361\u724c\u6548\u679c\u548c\u9875\u9762\u4e0b\u65b9\u663e\u793a\u7684\u5177\u4f53\u60e9\u7f5a\u9898\u3002',
        '5. \u6839\u636e\u5361\u724c\u7279\u6743\u51b3\u5b9a\u6700\u7ec8\u7531\u8c01\u6765\u6267\u884c\u8fd9\u9053\u60e9\u7f5a\u3002',
        '6. \u8fdb\u5165\u6218\u7ee9\u9875\u56de\u770b\u672c\u5c40\uff0c\u7136\u540e\u53ef\u4ee5\u518d\u5f00\u4e00\u5c40\u3002'
      ],
      manual: [
        '\u8fd9\u4e2a\u6e38\u620f\u6709\u4e24\u5c42\u903b\u8f91\uff1a\u7a00\u6709\u5ea6\u5361\u51b3\u5b9a\u7279\u6743\uff0c\u60e9\u7f5a\u9898\u5e93\u51b3\u5b9a\u771f\u6b63\u8981\u505a\u7684\u4efb\u52a1\u3002',
        '\u60e9\u7f5a\u661f\u7ea7\u7531\u5145\u6c14\u6b21\u6570\u51b3\u5b9a\uff1a1-6 \u6b21\u4e3a 1 \u661f\uff0c7-8 \u6b21\u4e3a 2 \u661f\uff0c9-10 \u6b21\u4e3a 3 \u661f\uff0c11-12 \u6b21\u4e3a 4 \u661f\uff0c13+ \u6b21\u4e3a 5 \u661f\u3002',
        '\u5982\u679c\u76ee\u6807\u661f\u7ea7\u6ca1\u6709\u9898\uff0c\u7cfb\u7edf\u4f1a\u5411\u4e0b\u56de\u9000\u5230\u66f4\u4f4e\u661f\u7ea7\uff0c\u786e\u4fdd\u80fd\u62bd\u51fa\u4e00\u9053\u53ef\u6267\u884c\u7684\u60e9\u7f5a\u3002',
        '\u9898\u5e93\u91cc\u7684\u7279\u6743\u7c7b\u6587\u672c\u4e0d\u4f1a\u88ab\u5f53\u6210\u6700\u7ec8\u60e9\u7f5a\u9898\u5c55\u793a\uff0c\u6240\u4ee5\u8f6c\u79fb\u6216\u6307\u5b9a\u7ed9\u522b\u4eba\u65f6\u603b\u6709\u4e00\u6761\u771f\u5b9e\u4efb\u52a1\u3002',
        '\u4f60\u53ef\u4ee5\u5728\u5c0f\u7a0b\u5e8f\u5185\u76f4\u63a5\u7f16\u8f91\u9898\u5e93\uff0c\u4fee\u6539\u4f1a\u4fdd\u5b58\u5728\u5f53\u524d\u8bbe\u5907\u5e76\u7acb\u5373\u5f71\u54cd\u540e\u7eed\u62bd\u9898\u3002'
      ],
      notes: [
        'N\uff1a\u6ca1\u6709\u4efb\u4f55\u7279\u6743\uff0c\u62bd\u5230\u7684\u4eba\u76f4\u63a5\u6267\u884c\u9875\u9762\u663e\u793a\u7684\u60e9\u7f5a\u9898\u3002',
        'SR\uff1a\u62e5\u6709\u53cd\u8f6c/\u8f6c\u79fb\u6743\uff0c\u4f60\u53ef\u4ee5\u5728\u770b\u5230\u9898\u76ee\u540e\u628a\u8fd9\u9053\u60e9\u7f5a\u4ea4\u7ed9\u5176\u4ed6\u73a9\u5bb6\u3002',
        'SSR\uff1a\u62e5\u6709\u62c9\u4eba\u5171\u540c\u6267\u884c\u6743\uff0c\u4f60\u53ef\u4ee5\u6307\u5b9a\u53e6\u4e00\u4f4d\u73a9\u5bb6\u548c\u4f60\u4e00\u8d77\u505a\u8fd9\u9053\u60e9\u7f5a\u3002',
        'UR\uff1a\u4f60\u81ea\u5df1\u8c41\u514d\uff0c\u4f46\u9875\u9762\u663e\u793a\u7684\u90a3\u9053\u60e9\u7f5a\u4ecd\u7136\u6709\u6548\uff0c\u4f60\u9700\u8981\u6307\u5b9a\u65b0\u7684\u6267\u884c\u8005\u3002',
        '\u51e1\u662f SR\u3001SSR\u3001UR \u8fd9\u7c7b\u6709\u7279\u6743\u7684\u5361\uff0c\u6700\u7ec8\u6267\u884c\u5185\u5bb9\u4e00\u5f8b\u4ee5\u5c55\u793a\u51fa\u6765\u7684\u60e9\u7f5a\u9898\u6587\u672c\u4e3a\u51c6\u3002'
      ],
      cards: {
        N: {
          title: '\u666e\u901a\u60e9\u7f5a',
          effect: '\u6ca1\u6709\u4fdd\u62a4\uff0c\u62bd\u5230\u7684\u4eba\u81ea\u5df1\u6267\u884c\u63ed\u793a\u7684\u60e9\u7f5a\u3002',
          detail: '\u9002\u5408\u76f4\u63a5\u51fa\u7ed3\u679c\u7684\u6807\u51c6\u73a9\u6cd5\uff0c\u4e0d\u9700\u8981\u989d\u5916\u89c4\u5219\u5904\u7406\u3002'
        },
        SR: {
          title: '\u53cd\u8f6c\u6321\u7bad\u724c',
          effect: '\u4f60\u53ef\u4ee5\u628a\u63ed\u793a\u7684\u60e9\u7f5a\u8f6c\u7ed9\u5176\u4ed6\u73a9\u5bb6\u3002',
          detail: '\u9898\u76ee\u5fc5\u987b\u5148\u5c55\u793a\u51fa\u6765\uff0c\u7136\u540e\u518d\u51b3\u5b9a\u662f\u81ea\u5df1\u505a\u8fd8\u662f\u4ea4\u7ed9\u522b\u4eba\u505a\u3002'
        },
        SSR: {
          title: '\u540c\u5f52\u4e8e\u5c3d',
          effect: '\u4f60\u53ef\u4ee5\u6307\u5b9a\u4e00\u4f4d\u73a9\u5bb6\u548c\u4f60\u4e00\u8d77\u6267\u884c\u8fd9\u9053\u60e9\u7f5a\u3002',
          detail: '\u4e5f\u5c31\u662f\u5148\u770b\u9898\uff0c\u518d\u9009\u4eba\uff0c\u8ba9\u6240\u6709\u4eba\u90fd\u6e05\u695a\u8fd9\u662f\u4e00\u9053\u4ec0\u4e48\u60e9\u7f5a\u3002'
        },
        UR: {
          title: '\u514d\u6b7b\u91d1\u724c',
          effect: '\u4f60\u672c\u4eba\u53ef\u4ee5\u8c41\u514d\uff0c\u4f46\u8fd9\u9053\u60e9\u7f5a\u4ecd\u8981\u7531\u4f60\u6307\u5b9a\u7684\u4ee3\u66ff\u8005\u6267\u884c\u3002',
          detail: '\u8fd9\u5f20\u5361\u53ea\u662f\u514d\u6389\u4f60\u81ea\u5df1\u7684\u8d23\u4efb\uff0c\u4e0d\u662f\u628a\u60e9\u7f5a\u5185\u5bb9\u4e00\u8d77\u53d6\u6d88\u3002'
        }
      }
    },
    room: {
      nav: '\u8054\u673a\u623f\u95f4',
      title: '\u5b9e\u65f6\u623f\u95f4',
      subtitle: '\u5148\u521b\u5efa\u6216\u52a0\u5165\u623f\u95f4\uff0c\u7b49\u6240\u6709\u4eba\u5230\u9f50\u540e\u518d\u7531\u623f\u4e3b\u5f00\u59cb\u3002',
      serverLabel: '\u670d\u52a1\u5668 URL',
      roomCodeLabel: '\u623f\u95f4\u7801',
      roomCodePlaceholder: '\u8f93\u5165\u623f\u95f4\u7801',
      roomIdTitle: '\u5f53\u524d\u623f\u95f4',
      playerListTitle: '\u73a9\u5bb6\u5217\u8868',
      createRoom: '\u521b\u5efa\u623f\u95f4',
      joinRoom: '\u52a0\u5165\u623f\u95f4',
      startGame: '\u5f00\u59cb\u8054\u673a\u6e38\u620f',
      syncRoom: '\u5237\u65b0\u623f\u95f4\u72b6\u6001',
      goBattle: '\u8fdb\u5165\u5bf9\u5c40',
      hostBadge: '\u623f\u4e3b',
      guestHint: '\u53ea\u6709\u623f\u4e3b\u53ef\u4ee5\u5f00\u59cb\u8fd9\u4e2a\u623f\u95f4\u3002',
      waiting: '\u7b49\u5f85\u73a9\u5bb6\u52a0\u5165',
      connected: '\u5df2\u8fde\u63a5',
      disconnected: '\u672a\u8fde\u63a5',
      needName: '\u8bf7\u5148\u8f93\u5165\u6635\u79f0\u3002',
      needRoomCode: '\u8bf7\u8f93\u5165\u623f\u95f4\u7801\u3002',
      needServer: '\u8bf7\u8f93\u5165\u670d\u52a1\u5668 URL\u3002',
      playerCountHint: '\u81f3\u5c11\u9700\u8981 2 \u4f4d\u73a9\u5bb6\u624d\u80fd\u5f00\u59cb\u3002',
      lobbyHint: '\u623f\u95f4\u5f00\u59cb\u6743\u5728\u623f\u4e3b\u624b\u91cc\u3002',
      startReady: '\u623f\u95f4\u5df2\u7ecf\u4e0d\u5728\u7b49\u5f85\u72b6\u6001\uff0c\u6b63\u5728\u8fdb\u5165\u5bf9\u5c40\u9875\u3002'
    },
    online: {
      nav: '\u8054\u673a\u5bf9\u5c40',
      title: '\u5b9e\u65f6\u6c14\u7403\u5bf9\u5c40',
      roomTitle: '\u623f\u95f4',
      currentTurn: '\u5f53\u524d\u56de\u5408',
      status: '\u72b6\u6001',
      taps: '\u5145\u6c14\u6b21\u6570',
      threshold: '\u7206\u70b8\u9608\u503c',
      tapNow: '\u70b9\u51fb\u6c14\u7403',
      waitTurn: '\u7b49\u5f85\u56de\u5408',
      waitingResolve: '\u7b49\u5f85\u7ed3\u7b97',
      resolveRound: '\u786e\u8ba4\u672c\u8f6e\u7ed3\u7b97',
      nextRound: '\u5f00\u59cb\u4e0b\u4e00\u8f6e',
      chooseTarget: '\u9009\u62e9\u88ab\u8f6c\u79fb\u73a9\u5bb6',
      choosePartner: '\u9009\u62e9\u4e00\u4f4d\u540c\u884c\u73a9\u5bb6',
      chooseSubstitute: '\u9009\u62e9\u4ee3\u66ff\u6267\u884c\u8005',
      roundLoser: '\u70b9\u7206\u8005',
      resultTitle: '\u76f2\u76d2\u7ed3\u679c',
      questionTitle: '\u60e9\u7f5a\u9898\u76ee',
      resolutionTitle: '\u672c\u8f6e\u7ed3\u7b97',
      lobbyBack: '\u8fd4\u56de\u623f\u95f4',
      statuses: {
        lobby: '\u7b49\u5f85',
        playing: '\u8fdb\u884c\u4e2d',
        resolving: '\u7ed3\u7b97\u4e2d',
        finished: '\u672c\u8f6e\u5b8c\u6210'
      },
      waitingMessages: {
        yourTurn: '\u8f6e\u5230\u4f60\u4e86\uff0c\u672c\u56de\u5408\u53ea\u80fd\u70b9\u4e00\u6b21\u3002',
        otherTurn: '\u73b0\u5728\u662f\u5176\u4ed6\u73a9\u5bb6\u7684\u56de\u5408\u3002',
        resolving: '\u7b49\u5f85\u70b9\u7206\u8005\u9009\u5b9a\u6700\u7ec8\u6267\u884c\u8005\u3002',
        finished: '\u672c\u8f6e\u5df2\u7ed3\u675f\uff0c\u51c6\u5907\u597d\u5c31\u53ef\u4ee5\u8fdb\u5165\u4e0b\u4e00\u8f6e\u3002'
      }
    },
    balloon: {
      nav: '\u6c14\u7403\u6311\u6218',
      player: '\u73a9\u5bb6',
      pumps: '\u5145\u6c14\u6b21\u6570',
      risk: '\u5371\u9669\u503c',
      pumpIt: '\u70b9\u51fb\u5145\u6c14',
      burst: '\u6c14\u7403\u5df2\u7206\u70b8',
      backHome: '\u8fd4\u56de\u9996\u9875',
      anonymous: '\u533f\u540d\u73a9\u5bb6',
      taunts: ['\u7a33\u4f4f', '\u522b\u624b\u6296', '\u8fd8\u6ca1\u5230\u6781\u9650', '\u9a6c\u4e0a\u5c31\u7206\u4e86', '\u52c7\u58eb\uff01'],
      ready: '\u51c6\u5907\u597d\u5c31\u5f00\u59cb\uff0c\u522b\u602f\u3002',
      firstHint: '\u6bcf\u70b9\u4e00\u4e0b\uff0c\u6c14\u7403\u5c31\u79bb\u547d\u8fd0\u66f4\u8fd1\u4e00\u6b65\u3002',
      redirectHint: '\u70b8\u4e86\uff0c1.5 \u79d2\u540e\u8fdb\u5165\u76f2\u76d2\u5f00\u5956\u3002',
      low: '\u4f4e',
      rising: '\u5347\u9ad8',
      critical: '\u6781\u9ad8',
      hintLow: '\u76ee\u524d\u8fd8\u7b97\u5b89\u5168\uff0c\u4f46\u522b\u9ad8\u5174\u592a\u65e9\u3002',
      hintMid: '\u6c14\u7403\u5df2\u7ecf\u5f00\u59cb\u4e0d\u5bf9\u52b2\u4e86\u3002',
      hintHigh: '\u518d\u70b9\u4e00\u4e0b\u90fd\u50cf\u5728\u8d4c\u547d\u3002'
    },
    blindbox: {
      nav: '\u76f2\u76d2\u5f00\u5956',
      title: '\u4f60\u70b8\u4e86\uff01\u9009\u62e9\u4f60\u7684\u547d\u8fd0',
      subtitle: '\u70b9\u51fb\u4efb\u610f\u4e00\u5f20\u5361\u724c\u7ffb\u5f00\u7ed3\u679c\uff0c\u6bcf\u5c40\u53ea\u80fd\u7ffb\u4e00\u6b21\u3002',
      starSuffix: '\u661f',
      punishmentHint: '\u4f60\u5728\u6c14\u7403\u9636\u6bb5\u70b9\u51fb\u8d8a\u591a\uff0c\u8fd9\u91cc\u62bd\u5230\u7684\u60e9\u7f5a\u96be\u5ea6\u5c31\u8d8a\u9ad8\u3002',
      waiting: '\u7b49\u5f85\u5f00\u5956',
      playAgain: '\u518d\u6765\u4e00\u5c40',
      openResult: '\u67e5\u770b\u6218\u7ee9'
    },
    result: {
      nav: '\u6218\u7ee9\u9875',
      pumps: '\u5145\u6c14\u6b21\u6570',
      result: '\u76f2\u76d2\u7ed3\u679c',
      reward: '\u5956\u52b1\u6807\u9898',
      questionType: '\u9898\u76ee\u7c7b\u578b',
      roundQuestion: '\u672c\u5c40\u9898\u76ee',
      share: '\u5206\u4eab',
      playAgain: '\u518d\u6765\u4e00\u5c40',
      backHome: '\u8fd4\u56de\u9996\u9875',
      missingQuestionType: '\u771f\u5fc3\u8bdd',
      missingQuestion: '\u8fd9\u4e00\u5c40\u6ca1\u6709\u8bfb\u53d6\u5230\u9898\u76ee\uff0c\u8bf7\u91cd\u65b0\u62bd\u53d6\u4e00\u5c40\u3002',
      summary: (clickCount, level, title) => `\u4f60\u6491\u8fc7\u4e86 ${clickCount} \u6b21\u5145\u6c14\uff0c\u62bd\u4e2d\u4e86 ${level} \u300c${title}\u300d\u3002`,
      shareTitle: (playerName, clickCount, level) => `${playerName} \u6491\u8fc7\u4e86 ${clickCount} \u6b21\uff0c\u62bd\u4e2d\u4e86 ${level}\uff01`
    },
    rewards: {
      UR: { title: '\u514d\u6b7b\u91d1\u724c', effect: '\u8fd9\u4e00\u8f6e\u4f60\u76f4\u63a5\u8c41\u514d\uff0c\u53ef\u4ee5\u6307\u5b9a\u4e00\u4f4d\u73a9\u5bb6\u4ee3\u4f60\u63a5\u53d7\u60e9\u7f5a\u3002' },
      SSR: { title: '\u540c\u5f52\u4e8e\u5c3d', effect: '\u4f60\u53ef\u4ee5\u62c9\u4e0a\u4e00\u4f4d\u73a9\u5bb6\u4e00\u8d77\u63a5\u53d7\u6311\u6218\uff0c\u73b0\u573a\u6c14\u6c1b\u76f4\u63a5\u5347\u7ea7\u3002' },
      SR: { title: '\u53cd\u8f6c\u6321\u7bad\u724c', effect: '\u4f60\u53ef\u4ee5\u628a\u8fd9\u6b21\u9898\u76ee\u8f6c\u9001\u7ed9\u522b\u4eba\uff0c\u6216\u8005\u8981\u6c42\u5168\u5458\u8865\u4e00\u8f6e\u56de\u7b54\u3002' },
      N: { title: '\u666e\u901a\u60e9\u7f5a', effect: '\u522b\u60f3\u8eb2\uff0c\u8001\u8001\u5b9e\u5b9e\u63a5\u9898\u3002' }
    },
    questions: {
      truth: '\u771f\u5fc3\u8bdd',
      dare: '\u5927\u5192\u9669',
      privilege: '\u7279\u6743'
    },
    library: {
      nav: '\u9898\u5e93\u7ba1\u7406',
      title: '\u60e9\u7f5a\u9898\u5e93\u7ba1\u7406',
      subtitle: '\u652f\u6301\u65b0\u589e\u3001\u7f16\u8f91\u3001\u5220\u9664\u60e9\u7f5a\u9898\uff0c\u4fdd\u5b58\u540e\u7acb\u5373\u5f71\u54cd\u540e\u7eed\u62bd\u9898\u3002',
      createTitle: '\u7f16\u8f91\u5668',
      listTitle: '\u5f53\u524d\u9898\u76ee',
      addNew: '\u65b0\u5efa\u9898\u76ee',
      save: '\u4fdd\u5b58\u9898\u76ee',
      cancelEdit: '\u53d6\u6d88\u7f16\u8f91',
      reset: '\u6062\u590d\u9ed8\u8ba4\u9898\u5e93',
      empty: '\u8fd9\u4e2a\u7a00\u6709\u5ea6\u6682\u65f6\u6ca1\u6709\u9898\u76ee\u3002',
      level: '\u7a00\u6709\u5ea6',
      type: '\u7c7b\u578b',
      theme: '\u4e3b\u9898',
      star: '\u661f\u7ea7',
      english: '\u82f1\u6587',
      chinese: '\u4e2d\u6587',
      edit: '\u7f16\u8f91',
      remove: '\u5220\u9664',
      confirmRemove: '\u786e\u5b9a\u5220\u6389\u8fd9\u6761\u9898\u76ee\u5417\uff1f',
      saved: '\u5df2\u4fdd\u5b58',
      deleted: '\u5df2\u5220\u9664',
      resetDone: '\u5df2\u6062\u590d\u9ed8\u8ba4\u9898\u5e93',
      validation: '\u8bf7\u628a\u4e2d\u82f1\u6587\u9898\u76ee\u90fd\u586b\u5b8c\u3002',
      levelOptions: { N: 'N', SR: 'SR', SSR: 'SSR', UR: 'UR' },
      typeOptions: { Truth: '\u771f\u5fc3\u8bdd', Dare: '\u5927\u5192\u9669', Privilege: '\u7279\u6743' },
      themeOptions: {
        classic: '\u7ecf\u5178',
        friends: '\u670b\u53cb',
        party: '\u6d3e\u5bf9',
        couple: '\u60c5\u4fa3',
        work: '\u804c\u573a'
      }
    }
  }
}

function getLanguage() {
  return wx.getStorageSync('appLang') || 'en'
}

function setLanguage(lang) {
  wx.setStorageSync('appLang', lang)
}

function t(lang = 'en') {
  return messages[lang] || messages.en
}

module.exports = {
  getLanguage,
  setLanguage,
  t
}
