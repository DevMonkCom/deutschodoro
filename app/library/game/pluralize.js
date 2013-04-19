define(
    ['wordFinder', 'german/noun', 'vendor/underscore'],
    function(wordFinder, germanNoun){
        var pickedWord = null, answer = null, words;

        /**
         *
         * @return {Boolean}
         */
        function create() {
            pickedWord = wordFinder.getWord({type:"noun", plural:'!–'});

            answer = germanNoun.getPlural(pickedWord.german, pickedWord.plural);
            console.log(answer);

            if (answer === false) {
                throw 'Picked word: `' + pickedWord.german + '` was not pluralizable.';
            }

            words = [answer];

            words.push(germanNoun.getPluralWrongPlural(pickedWord.german, words));

            words.push(germanNoun.getPluralWrongPlural(pickedWord.german, words));

            words = _.shuffle(words);

            return true;
        }

        /**
         *
         * @return {String}
         */
        function getHtml() {
            var html = [], html2 = [], i;

            for (i = 0; i < 3; i++) {
                html2.push('<li>');
                html2.push('<label for="' + words[i] + '">');
                html2.push('<input type="radio" name="word" value="' + words[i] + '" id="' + words[i] + '">');
                html2.push(' <span>' + words[i] + '</span>');
                html2.push('</label>');
                html2.push('</li>');
            }

            html.push('<h1>Pluralize</h1>');
            html.push('<p>What is the plural of `' + pickedWord.german + '`?</p>');
            html.push('<ul class="options">');
            html.push(html2.join(''));
            html.push('</ul>');
            html.push('<p><button id="submit">Submit</button></p>');

            return html.join('');
        }

        /**
         *
         * @param {String} word
         * @return {Boolean}
         */
        function checkResult(word) {
            return word == answer;
        }

        /**
         *
         * @return {Array}
         */
        function getUsedWords() {
            return [pickedWord];
        }

        /**
         *
         * @return {Object}
         */
        function getAnswer() {
            return answer;
        }

        return {
            create: create,
            getHtml: getHtml,
            checkResult: checkResult,
            getUsedWords: getUsedWords,
            getAnswer: getAnswer,
            importance: 50
        };
    }
);