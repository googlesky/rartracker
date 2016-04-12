(function(){
	'use strict';

	angular
		.module('app.shared')
		.directive('fileModel', fileModel);

	function fileModel() {
		return {
			restrict: 'A',
			scope: {},
			bindToController: {
				fileModel: '=',
				fileChanged: '&'
			},
			controller: FileModelController,
			controllerAs: 'vm'
		};
	}

	function FileModelController($scope, $element, $timeout) {
		$element.bind('change', (changeEvent) => {
			this.fileModel = changeEvent.target.files[0];
			if (this.fileModel) {
				$timeout(() => {
					this.fileChanged();
				});
				$scope.$apply();
			}
		});

		$scope.$on('$destroy', () => {
			$element.unbind('change');
		});
	}

})();

(function(){
    'use strict';

    angular
        .module('app.shared')
        .directive('fileModel2', fileModel2);

    function fileModel2() {
        return {
            restrict: 'A',
            scope: {},
            bindToController: {
                fileModel2: '=',
                fileChanged2: '&'
            },
            controller: FileModelController2,
            controllerAs: 'vm'
        };
    }

    function FileModelController2($scope, $element, $timeout) {
        $element.bind('change', (changeEvent) => {
            this.fileModel2 = changeEvent.target.files[0];
        if (this.fileModel2) {
            $timeout(() => {
                this.fileChanged2();
        });
        $scope.$apply();
    }
});

$scope.$on('$destroy', () => {
    $element.unbind('change');
});
}

})();
